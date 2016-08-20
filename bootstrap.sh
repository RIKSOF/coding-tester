#!/usr/bin/env bash
#
# Copyright RIKSOF (Private) Limited 2016.
#
# Installation scripts for getting vm ready with needed software.

# Make sure respositories are up to date.
apt-get update

# Install Node.js and its package manager
apt-get install -y nodejs npm

# Make nodejs accessible as node 
# http://stackoverflow.com/questions/18130164/nodejs-vs-node-on-ubuntu-12-04
ln -s `which nodejs` /usr/bin/node

# Install forever, to make sure API simulator keeps running.
npm install forever -g
npm install forever-service -g

# Install Nginx
apt-get install -y nginx

# Copyg Nginx configuration file.
cp /vagrant/coding-tester.nginx.conf /etc/nginx/sites-enabled/.

# Re-start nginx
service nginx restart

# Now copy the source to our home drive. This is needed to make sure
# our service starts even when shared drive is not available.
cp -r -f /vagrant/client/ /home/vagrant

pushd /home/vagrant/client

# Install node modules
npm install

popd

# Start the server
#pushd /home/vagrant/simulator

# Install dependencies
#npm install

# Start the server
#forever-service install api --script api/server.js
#service api start

#popd