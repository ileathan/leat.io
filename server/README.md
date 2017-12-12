# leat-server.js

This is the core functions of the server, if you output the object in the terminal you will see its massive.

In fact to verify the keys match and it runs modularly enter the repl enviroment 

```bash
node
```

Then at the `> ` node repl prompt type:

```javascript
leatServer = require('leat-server'); 
lS = new leatServer; 
```

You should get a massive looking JSON object. Good, now scroll to the top and verify the `server.key` 
it will be a long hexidecimal number and it should match `2d...2d0a4d4949457041494241414b4341514541796d...`

Or more easily

```lS.server.key.toString()
// '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAymLBp2QeW632CuG5PSAI/ivElNPZaFHxGOu4XA8mHru7sSYg\n93jUGcBDILVKFwPGApQAK+bF3gjdSqHQbIx+5YWV8fFErvl8ZlfM14U8CZ+29DER\nQcbsKeApiN3K8rK7N3hCnP/F3n2xXInMxMf81f5t0jRHKtI1GlreR5DQ8ZILRfMS\nRseNdKYDukvJoVcpyjEVHUh9ZGVLvDwQcMleJlIKjxJ1KeVyTdo2gYmJvtKSNU98\nfyS345HmRHgHrEa1/t/S7GkQTbCTYCevV4f99UnjJInrs/pAJlgWasW0xG91etyL\nc6GwscBVxlFzBlwvt46VJyXruJRRXInRU/umQQIDAQABAoIBAFw0dgnvQS1/qhL3\nF8/TYoV6J0uu4OP4QSGbcxjuBe4GldJ1jptwvyEkSPED50do/rN5/kICF6+61icE\nZdKuh7nGDLR3uVUGcTinU7n1B49S5qWGHVicakgByqqCcc30w/rXnXGtzdY56a5B\nUbttabGNAze7fZjywCLLt21fevIzSdOmnWpayTmZRFd4969Gkpaqsdd/7xwq3xEN\nR9YVG0M6qeXR/em3JOoiAj8SXPQuelPHKbrqGmgm6lqpn43FvlJcjv+VrIS/LKkP\nxa6FCvjuG2AWmWSloGXmic8+VsltXhV2fTSgMZoMlBWIVKnI08Ogg2+24JYJE5fP\nqwtWGmECgYEA6pIh1RY/Fwmiic2T/+kEdefZ7lIISxCSfdzDX74HaHt4Haorchfa\ncFAgL5i56/DVBdy7zhQ9YKL/2q91EsVdBE0ERtr4BL6vUR9Llt9ORgDpqpIlEiZF\n4LHOs/HeLPnGMn1OntFZOEg/j/SiccM/OW1CpWDciJShYmNPcT1/Ek0CgYEA3N/q\n8534A0i/fFGsUsNuwfgSqKK7e/n8chkwJbQR6JBF07eMHRYUsN70ni2ngeaERj5T\n8nE/8xKIzFgwOZ5ZaVR66E4a15R150g2Y8NlNbePdezU8xw6h0+TNn1uH57dQhMR\n7DIXB/0k8ee7b3hlVG2M2WUJ4uJK9N1i42obVcUCgYEAo16biZkw346qUWeIiFd1\n79hGhCFF/WHRZS94Mxpadn5nreFy2MecL1Te1cd81cKp2qddda3LAZ8Eqv5Af45N\ntk0diWvACS31VH6DWtSz4zWHiHC4uOdHC7NKzzDJGHHthASZ2SrdBMHs4wnyiWD+\ni7R5Ek1fyxAZRjj8f1XhRpECgYEAkuv307l+omCfz0hcwmjxoeEsODSXVe6B+Du9\nBTd0uihN6nkroKVxef205gskY4o87qTDHoAqs7ved18qJQmqHCBv6VsbC8/bZc9p\nLo9pIYRKz3yMYnKilCNgn1xsBmiccTlSMLVZEJ1ZF/i3e3ywmqqMiIdnPh6dEai6\nAOAx8qkCgYAnE+giM7v2ijWyoeN3S7KSf6gDGzt+MKMKkXeWRII5TTdyvtkKPinN\nf+JrSRLXf5VIK+DKS8dC7Itfb+HH0GSrzR/YbrSnwiHYl7rKZ22hjT52OvRi32s5\nQNEXH8goGzZi1jhSXzHXW/ZDEBi8+qYEV6/HN/3h5mEzzV9M6N/nSA==\n-----END RSA PRIVATE KEY-----\n'
```

This is our devel key and it just proves localhost. but we may use it in the genises block after launch.
