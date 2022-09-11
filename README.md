# javascript-book

The javascript book to understand what is Javascript, an engine, a runtime, and other inner workings.

This book is made for beginners - advanced javascript developers with examples for building
synchronous and asynchronous applications. View the [async](./examples/async) and [sync](./examples/sync/) folders
for javascript that can be executed in the browser or nodejs to get a better understanding with real examples.

This book is a WIP and the chapters are not complete or done in order.

## Chapter 1

What exactly is Javascript?

Javascript or JS is a dynamic scripting language that confirms to the [ECMAScript](https://tc39.es/ecma262/) language and originally was created to target solely browsers.
JS is a way for code to run that targets the machine platform with actual calls that a computer can understand. Javascript has no relationship to
java and during the early days of the web netscape was looking into bringing java into browsers at the same time the
javascript language was being built. Scripting languages are more efficient when it comes to output since it is
a collection of calls that would be done either one by one or masking internal implementations to a larger challenge.

They say you can write the same program 10x faster in a scripting language vs a non scripting language like C.
Now this ratio scales as the barrior for entry for working with programs like C and C++ are just above the assembly
and have a wide range target entry as the things required to complete a program change.

A browser is a program that is made that to navigate the www or web for information and exchanges.
Before javascript a website could display HTML/CSS content but, lacked ways to express dynamic changes that should occur on
events or Event-System. Being that a browser is a program that is built by developers the initial traction to
bring this experience was the use of a language that had a runtime that can target the system called [Java Applets](https://en.wikipedia.org/wiki/Java_applet).
Now the most common use to bring java to the browser is through [web start](https://www.java.com/en/download/help/java_webstart.html) which allows the usage of javascript to bring
older applications with the browsers engine like v8 which use JIT just like the JVM to target machine code. Using javascript on most browsers will usually be faster than java implementation due leveraging the engines optimisations at
hand naturally and simplicity.

As javascript evolved and gained more features the phasing of Java Applets went away over the years since it can do everything that the Java Applet could do
without the need of the JVM and installing additional software. Now we write javascript on the client, server, and bare metal environments.

## Chapter 2

### Javascript in the browser

The current state of javascript in the browser has the ability to run on the primary thread and in the background with service workers.
[Webassembly](https://developer.mozilla.org/en-US/docs/WebAssembly) is another target that can be used in the browser that is complimented by javascript glue to use with
the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). The way javascript is used has a wide purpose for getting to the browser. One is using directly with the HTML `<script />` tag and the other is using js code
to build HTML before hand with frameworks like [next.js](https://nextjs.org), [astro](https://astro.build), and other frameworks to transform files that can be used
in a browser. In other words it can start out as javascript and end fully as HTML or etc.

## Chapter 3

### Javascript fundamentals

## Chapter 4

### Javascript everywhere

## Chapter 5

### What is a Javascript Engine?

A javascript engine is the ability to use the [ECMAScript](https://tc39.es/ecma262/) standard to execute code that will perform events as intended like determing simple
Math all the way to fetching data from other servers and handling http request (the way of the internet to share web resources for browsers).

The javascripts engine main goal is to run the ECMAScript code fast and comply to the standard for CPU bound operations or data processing.
When a javascript engine provides sys calls that is now outside the ECMAScript standards duties for conventions on methods uniformity.
Example - one javascript engine may allow access to store data to the filesystem or disk while another only handles data access in memory without
persitance. You can look at javascript the variant and ECMAScript as the standard for the language.

Another important goal of the javascript engine is to handle how task and micro task run. With GUI applications like browsers the entire
process is one infinity loop. The engine handles how each process takes a turn so that way operations like dragging a mouse cursor or pressing
an event can perform at a steady framerate without looking like it is slowing down or falling behind. The more that a program can lean on
[zero cost abstractions](https://boats.gitlab.io/blog/post/zero-cost-abstractions/) alleviates the downsides of runtime performance loss across hardware.

The javascript engine handles the way memory is allocated for data structures. The trade offs for the memory allocation is different depending
on the javascript engines goals as long as it conforms to the ECMAscript standard.

Asynchronous loops allow multiple operations to perform that can take time that will block the runtime from actions.
Most engines that are built in a lower level language like C, C++, and Rust control the way each task executes so that way
stability and multiple operations can occur. You can think of async as a way for operations that could be potentially long to pause
and resume at different intervals so that way everyone gets a turn.

You can look at a javascript engine as a rancher managing the stable full of cattle.

#### Caching like a boss with [v8](https://v8.dev/)

The v8 engine by google chrome is one of the most used javascript engines. It has the ability to run on the client or server with bindings.
The engine takes javascript code and transforms it to machine code with JIT compilation, in other words it aggressively caches objects that
are used multiple times to increase performance. The engine itself has the ability to perform computations using the CPU and allowing the
developer to expose calls to C++ applications that call system level code like the filesystem or io events.

##### Async

The v8 engine has a powerful async runtime that can be used to process millions of events on a single cor effortlessly.
The async engine in v8 has a lot of mis-conceptions like using `await` keyword on a non async function you would think
does not do a thing but, it actually takes a tick counter out of the async runtime queue!. With task and micro tasks
the operations are determined by the runtime to efficiently handle workloads and prevent the CPU from clocking to 100%
and above for CPU operations. Native operations with async handling that call platform code has the ability to go beyond
100% CPU with async handling or expensive CPU operations that are trying to do large calculations without yielding to the system.

Note: async runtimes can be ported to use in different languages or code since at the core it is C/C++ code that determines
the flow of events. A process can only have one runtime at a time, except threads can have their own managed runtime.

#### Using the most of [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore)

JavaScriptCore is a javascript engine that uses [Webkit engine](https://webkit.org/project/) and is very efficient when it comes to stability across hardware and running consistently.
Webkit performs efficiently when it comes to resource usage across systems that only need to do something once or twice and completing. The main reason for this is that it performs caching but, not at an agressive level
allowing for minimal processing for common operations. Webkit uses [bare-bones](https://webkit.org/docs/b3/) to cache heavy C like operations instead of all
events, the compiled JIT code references a pointer in memory to the machine code function to execute.

JavascriptCore you can insert objects that reference C in memory to use in a javascript runtime just like v8, [bun](https://bun.sh/) is a runtime that does this.

## Chapter 6

### What is a Javascript Runtime?

A javascript runtime uses a javascript engine to uses the javascript language for operations. It can call native system events from C libraries since the runtime is made in a similiar high level language.

The javascript runtime takes the mind of the javascript engine to transform data in a way that it can be used in system libraries by references. The runtimes job is to incoperate things like native disk io,
network io, timers and even threads (heavier since the runtime is needed in each thread instead of the bare native POSIX pthread).

#### Node ticking tick

Nodejs is a javascript runtime that uses the v8 engine made using C++. It has an event loop that can work really well with streaming and even async handling across one core making it ideal for web sockets!

Nodejs sends operations when it can to the system kernal to leverage multiple CPU archictures and send calls back upon completion. Take a look at the [v8 engine batching example](./examples/async/v8-engine-batching.js) that performs the operations and
runs them across multiple cors if available.

#### Deno security and IO unlocked

[Deno](https://deno.land/) is a secure typescript and javascript runtime powered by v8 and made using Rust. Deno is made using Rust with hard tuned security at default that enfornces more control on what should be done, who, and how.
Before the app startup process the program needs flags that control network io, fs, and other levels of permissions for async events directed for native events. Modules in deno can easily bridge Rust crates
to javascript for usage across the server and browser(wasm) by using `deno_core::Extension` to register the module.

[Deno](https://github.com/denoland/deno/blob/main/runtime/Cargo.toml) io super powers thanks the [`tokio`](https://tokio.rs/) runtime for the latency and speed achieved.

#### Bun bun bun

The bun fun on bringing the most of SafariCore to develop client and server applications. The runtime is made using the Zig lang which has a high control of the memory at play for a data structure like Rust `unsafe`.
