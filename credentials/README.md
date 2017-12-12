# Key generation

The only command I used in order to generate production grade certificates was as follows.

```
sudo certbot certonly --webroot -w /Users/leathan/Mubot/node_modules/hubot-server/public/ -d leathan.xyz,www.leathan.xyz,api.leathan.xyz,leat.io,www.leat.io,api.leat.io
```
https://certbot.eff.org/ is the greate utility that offers free CA's.

There are many options, and its worth a bit of a read but `--webroot` just means anywhere on your website that it can both write to locally, and then http remotely.

If you do not have a server currently running there is a `--standalone` option which is handy that just creates a server for you and does it.

Theres more but another options is `--apache` ofcoure, for the legacy LAMP stack ofc.


Once you have your keys (you can also self sign) we will be using privkey, fullchain, and chain.

__Your https server options may look like so__

```
const fs = require('fs'), path = require('path');
const options = {
    key: fs.readFileSync (path.join(__dirname, 'credentials/privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'credentials/fullchain.pem')),
    ca: fs.readFileSync  (path.join(__dirname, 'credentials/chain.pem'))
};
```


# Self signed

I really recommend using letsencrypt's certbot. I did self signed certs for many years and the world just isnt there yet. *Someday.*

```bash
# Generate a passphrase (this is your keys key...)
openssl rand -base64 48 > passphrase.txt

# Generate a Private Key
openssl genrsa -aes128 -passout file:passphrase.txt -out server.key 2048

# Generate a CSR (Certificate Signing Request)
openssl req -new -passin file:passphrase.txt -key server.key -out server.csr \
    -subj "/C=FR/O=krkr/OU=Domain Control Validated/CN=*.krkr.io"

# Remove Passphrase from Key
cp server.key server.key.org
openssl rsa -in server.key.org -passin file:passphrase.txt -out server.key

# Generating a Self-Signed Certificate for 100 years
openssl x509 -req -days 36500 -in server.csr -signkey server.key -out server.crt

mv server.crt ssl.crt
mv server.key ssl.key

# \n ewline
```

Now in your options do 

```
const fs = require('fs'), path = require('path');
const options = {
    key: fs.readFileSync (path.join(__dirname, 'credentials/ssl.key')), // Your deterministic key (pub key info IS here too)
    cert: fs.readFileSync(path.join(__dirname, 'credentials/ssl.crt')), // Your certificate information (pub key included)
    ca: fs.readFileSync  (path.join(__dirname, 'credentials/server.csr')) // certificate signing request
};
```
