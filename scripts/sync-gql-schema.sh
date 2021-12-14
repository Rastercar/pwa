#!/bin/bash

# Syncs the schema definition file with the one on the API folder (assuming the api was cloned in the same directory as this project)

cp ../api/src/graphql/schema.gql ./src/graphql
yarn gen-gql
