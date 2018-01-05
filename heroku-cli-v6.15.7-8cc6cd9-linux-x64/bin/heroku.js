#!/usr/bin/env node
const {run} = require('@cli-engine/engine')
const config = {
  channel: 'stable',
  version: '6.15.7-8cc6cd9'
}
run(process.argv, config)
