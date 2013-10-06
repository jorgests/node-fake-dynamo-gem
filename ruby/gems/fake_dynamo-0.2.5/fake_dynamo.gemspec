# -*- encoding: utf-8 -*-
require File.expand_path('../lib/fake_dynamo/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Anantha Kumaran"]
  gem.email         = ["ananthakumaran@gmail.com"]
  gem.summary       = "local hosted, inmemory fake dynamodb"

  gem.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  gem.files         = `git ls-files`.split("\n")
  gem.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  gem.name          = "fake_dynamo"
  gem.require_paths = ["lib"]
  gem.version       = FakeDynamo::VERSION

  gem.required_ruby_version = '>= 1.9.0'
  gem.add_dependency 'sinatra'
  gem.add_dependency 'activesupport'
  gem.add_dependency 'json'
end
