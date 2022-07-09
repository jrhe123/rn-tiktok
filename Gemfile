source "https://rubygems.org"
ruby '3.0.0'
gem 'cocoapods', '~> 1.11', '>= 1.11.2'
gem "fastlane"
plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval(File.read(plugins_path), binding) if File.exist?(plugins_path)