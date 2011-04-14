#!/usr/bin/env ruby
require "logger"
require "json"
require "rubygems"
require "bundler/setup"

Bundler.require(:default)

class TutorialServer

  def initialize(host,port)
    @host = host
    @port = port
    @logger = Logger.new(STDOUT)
    @sockets = {}
  end

  def run
    @logger.info "Starting server"

    EventMachine.run do
      @logger.info "Listening on #{@host}:#{@port}"

      EventMachine::WebSocket.start(:host => @host, :port => @port) do |socket|
        socket.onopen do
          @logger.debug "socket #{socket.object_id} opened"
          @sockets[socket] = 1
        end

        socket.onmessage do |msg|
          @logger.info "received: #{msg}"
          broadcast(msg)
        end

        socket.onerror do |s|
          @logger.debug "error: #{s.inspect} #{s.backtrace}"
        end

        socket.onclose do
          @logger.debug "socket #{socket.object_id} closed"
          @sockets.delete(socket)
        end
      end

      EventMachine::add_periodic_timer(10) { broadcast(JSON.generate({ :type => "ping" })) }

      trap("INT") do
        exit
      end
    end
  end

  def broadcast(msg)
    @sockets.keys.each { |socket| socket.send(msg) }
  end
end

puts $0

if File.basename(__FILE__) == $0
  TutorialServer.new('localhost',8080).run
end
