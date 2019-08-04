# Meet 🐋 Laboon

Laboon are *modern documentation generator* for your application, with simple configuration. That can generate beautiful and simple documentation from your JavaScript, TypeScript, Markdown or even Vue Component. With block comments `/**...*/` annotation you can describe the function / docs and Laboon will generate a user interface for you.

> Laboon is the name of large whale in the anime Straw Hat Pirates [detail](https://onepiece.fandom.com/wiki/Laboon)

## Usage

### Install

Install **laboon** with :

```
$ npm install -g @laboon/cli
# or
$ yarn global add @laboon/cli
```

Show any options and format using **laboon --help**

```bash
$ laboon --help

🐋 Modern documentation generator for your application

Usage
  $ laboon <input>

Commands
  clean                   Removing cache on generator

Options
    --format, -f          File format to compile
    --exclude, -e         Excluding file / folders
    --source, -s          Source directory to generate (optional)
    --destination, -d     Destination folder of docs (default .laboon)
    --host, -h            Host of development preview
    --port, -p            Port of development preview
    --siteName, -S        Set site name for Gridsome
    --siteDescription, -D Set site description for Gridsome
    --siteUrl, -U         Set site url for Gridsome
    --pathPrefix, -P      Set path prefix for Gridsome

Examples
  $ laboon -f vue -f md -e node_modules -s src -d docs
```

### Start Laboon

Last, run this command :

```bash
$ laboon
```

### Configure

First of all, create **laboon.yml** on your project. With content like code below :

```yaml
# laboon.yml

format: format # format
exclude: exclude # exclude
source: source # source
destination: destination # destination
host: host # host
port: port # port
```

> You can use separate folder for destination, eg. **public/docs**

Next, create block comment on your documented method or variable. Like below example inside PHP file :

```php
<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
  /**
   * @name Example API PHP
   * @type Routes
   * @method GET
   * @parameters {
   *   username : String Required Null
   *   email : String Required Null
   * }
   */
  public function show($id)
  {
      return view('user.profile', ['user' => User::findOrFail($id)]);
  }
}
```

Markdown file :

```markdown
----
name : Example Document
type : Documents
----

# Hello World

Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis natus dolore quo iste! Quibusdam quisquam laborum quos eligendi natus, reiciendis praesentium delectus ducimus enim. Aspernatur dicta provident veniam aliquam obcaecati!

### Example Flowchart

[flow]
  graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
[/flow]

Debitis natus dolore quo iste! Quibusdam quisquam laborum quos eligendi natus, reiciendis praesentium delectus ducimus enim. Aspernatur dicta provident veniam aliquam obcaecati!
```

JavaScript file :

```js
class User {

  /**
   * @name Example API Node.js
   * @type Routes
   * @method GET
   * @parameters {
   *   username : String Required Null
   *   email : String Required Null
   * }
   */
  index(req, res) {
    res.json('name' => 'John Doe')
  }
}
```

Or, even your Vue Component file :

```html
<template>
  <div>
    <!-- Form header -->
    <slot name="header">
      <!-- `<th>title</th>` -->
      <th>title</th>
    </slot>
  </div>
</template>

<script>
// This is a description of the component
export default {
  name: 'MyComponent',
  props: {
    // The name of the form, up to 8 characters
    name: {
      type: [String, Number],
      required: true,
      validator () {}
    }
  },
  methods: {
    // @vuese
    // Used to manually clear the form
    clear () {
      // Fire when the form is cleared
      // @arg The argument is a boolean value representing xxx
      this.$emit('onclear', true)
    }
  }
}
</script>
```

> For further information about documenting Vue file, please see [Vuese detail](https://vuese.org/cli/#motivation).

## License

This project under MIT License