Simplecors
----------

A shim library, with fallbacks for IE9, to make simple header-less GET
cors calls returning a json object.

This library assumes you are using requirejs and jquery > 2, and
that you are setting up these prerequisites manually.  The simplecors
module requires module 'jquery', which will need to have been defined earlier.
Likewise, the library assumes you have set up the server to respond
approriately to the CORS or XDomainRequest (IE9) transport protocol.
