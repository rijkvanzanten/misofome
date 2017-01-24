# Misofome API Reference

This documentation is intended to get you up and running with the current version of the Misofome API. We’ll cover everything you need to know, from authentication, to manipulating results.  

The REST API provides programmatic access to read and write data. List documents, edit users, and more. The REST API identifies users using json webtokens; requests and responses are in JSON.

All JavaScript examples use the [superagent](https://github.com/visionmedia/superagent) library for HTTP requests to be easily readable.

## Table of Contents

### Introduction
* [Installation](introduction.md#installation)
* [Authentication](introduction.md#authentication)
* [Data schemas](introduction.md#schemas)

### Endpoints
#### User
* [Login](user.md#login-user)
* [Create User](user.md#create-user)
* [Update User](user.md#update-user)

#### Collection
* [Create](collection.md#create-document)
* [Read](collection.md#get-documents)
* [Update](collection.md#update-document)
* [Delete](collection.md#delete-document)
