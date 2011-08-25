/**
 * Jenkins hash implementation which yeilds 32-bit and 64-bit hashes.
 *
 * // Usage: 
 * var hash32 = Jenkins.hash32("");
 * var hash64 = Jenkins.hash64("");
 */
var Jenkins = {
    /**
     * Default first initial seed.
     */
    pc: 0,

    /**
     * Default second initial seed.
     */
    pb: 0,

    /**
     * Computes and returns 32-bit hash of given message.
     */
    hash32: function(msg, seeds) {
        pc = typeof(seeds) != 'undefined' && typeof(seeds[1]) != 'undefined' ? options[1] : this.pc;
        pb = typeof(seeds) != 'undefined' && typeof(seeds[0]) != 'undefined' ? options[0] : this.pb;

        h = this.lookup3(msg, pc, pb);
        return (h.c).toString(16);
    },

    /**
     * Computes and returns 32-bit hash of given message.
     */
    hash64: function(msg, seeds) {
        pc = typeof(seeds) != 'undefined' && typeof(seeds[1]) != 'undefined' ? options[1] : this.pc;
        pb = typeof(seeds) != 'undefined' && typeof(seeds[0]) != 'undefined' ? options[0] : this.pb;

        h = this.lookup3(msg, pc, pb);
        return (h.b).toString(16) + (h.c).toString(16);
    },

    /**
     * Implementation of lookup3 algorithm.
     */
    lookup3: function(k, pc, pb) {
        var length = k.length;
        var a, b, c;

        a = b = c = 0xdeadbeef + length + pc;
        c += pb;

        var offset = 0;
        while (length > 12) {
            a += k[offset + 0];
            a += k[offset + 1] << 8;
            a += k[offset + 2] << 16;
            a += k[offset + 3] << 24;

            b += k[offset + 4];
            b += k[offset + 5] << 8;
            b += k[offset + 6] << 16;
            b += k[offset + 7] << 24;

            c += k[offset + 8];
            c += k[offset + 9] << 8;
            c += k[offset + 10] << 16;
            c += k[offset + 11] << 24;

            mixed = this.mix(a, b, c);
            a = mixed.a;
            b = mixed.b;
            c = mixed.c;

            length -= 12;
            offset += 12;
        }

        switch (length) {
            case 12: c += k[offset + 11] << 24;
            case 11: c += k[offset + 10] << 16;
            case 10: c += k[offset + 9] << 8;
            case 9: c += k[offset + 8];

            case 8: b += k[offset + 7] << 24;
            case 7: b += k[offset + 6] << 16;
            case 6: b += k[offset + 5] << 8;
            case 5: b += k[offset + 4];

            case 4: a += k[offset + 3] << 24;
            case 3: a += k[offset + 2] << 16;
            case 2: a += k[offset + 1] << 8;
            case 1: a += k[offset + 0]; break;

            case 0: return {c: c, b: b};
        }

        // Final mixing of three 32-bit values in to c
        mixed = this.finalMix(a, b, c)
        a = mixed.a;
        b = mixed.b;
        c = mixed.c;

        return {c: c, b: b};
    },

    /**
     * Mixes 3 32-bit integers reversibly but fast.
     */
    mix: function(a, b, c) {
        a -= c; a ^= this.rot(c, 4); c += b; 
        b -= a; b ^= this.rot(a, 6); a += c;
        c -= b; c ^= this.rot(b, 8); b += a;
        a -= c; a ^= this.rot(c, 16); c += b;
        b -= a; b ^= this.rot(a, 19); a += c;
        c -= b; c ^= this.rot(b, 4); b += a;
        return {a : a, b : b, c: c};
    },

    /**
     * Final mixing of 3 32-bit values (a,b,c) into c
     */
    finalMix: function(a, b, c) {
        c ^= b; c -= this.rot(b, 14);
        a ^= c; a -= this.rot(c, 11);
        b ^= a; b -= this.rot(a, 25);
        c ^= b; c -= this.rot(b, 16);
        a ^= c; a -= this.rot(c, 4);
        b ^= a; b -= this.rot(a, 14);
        c ^= b; c -= this.rot(b, 24);
        return {a : a, b : b, c: c};
    },

    /**
     * Rotate x by k distance.
     */
    rot: function(x, k) {
        return (((x) << (k)) | ((x) >> (32-(k))));
    }
};

