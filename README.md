# Jenkins Hash

A Javascript implementation of Bob Jenkins' hash for non-cryptographic purposes. This implementaion can yield 32-bit and 64-bit hash values and can be used for hashtable lookups.

## What is Jenkins hash?
Jenkins hash is a general purpose hash algorithm created by Bob Jenkins. It takes an input of variable length and processes chunks of 12-bytes each and outputs a hash value as 32 bit or 64 bit hexa decimal integer.

Advantages over other hash algorithms:

1. Uniform distribution of hashes
2. Very good <a href="http://en.wikipedia.org/wiki/Strict_Avalanche_Criterion">avalanche effect</a>
3.  Faster than most hash algorithms in terms of number of instructions used in hash calculation. 

# Usage
    var message = "";
    var h32 = Jenkins.hash32(message); // 32-bit hash as hexadecimal string
    var h64 = Jenkins.hash64(message); // 64-bit hash as hexadecimal string


# References

* Jenkins, Bob (May 2006). <a href="http://www.burtleburtle.net/bob/hash/doobs.html">The Hash</a>. Retrieved 2011-08-21.

