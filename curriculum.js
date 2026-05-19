// Helper: builds a runnable code block
function cb(code, label = 'python') {
  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  const escaped = esc(code);
  const attr = escaped.replace(/"/g, '&quot;');
  return `<div class="code-block">
    <div class="code-block-header">
      <span>${label}</span>
      <button class="run-example-btn" data-code="${attr}">▶ Run</button>
    </div>
    <pre><code class="language-python">${escaped}</code></pre>
    <div class="runner-output"></div>
  </div>`;
}

// curriculum.js — all lesson content
// cb() is defined in app.js and available globally

const curriculum = [
  // ─────────────────────────────────────────────
  // MODULE 1: Getting Started
  // ─────────────────────────────────────────────
  {
    id: 'm1', title: 'Getting Started', icon: '🚀',
    description: 'What Python is, how to run it, and your first program.',
    lessons: [
      {
        id: 'm1l1', title: 'What is Python?',
        content: `
          <h2>What is Python?</h2>
          <p>Python is a general-purpose programming language known for its readable syntax and massive ecosystem. It's used for web backends, data science, automation, AI/ML, scripting, and more.</p>
          <p>It was created by Guido van Rossum in 1991. Today, Python 3 is the only version worth learning.</p>
          <h2>Why Python?</h2>
          <ul>
            <li><strong>Easy to read</strong> — code looks almost like English</li>
            <li><strong>Huge community</strong> — libraries exist for almost everything</li>
            <li><strong>Versatile</strong> — scripts, apps, data pipelines, AI models</li>
            <li><strong>Fast to write</strong> — less boilerplate than most languages</li>
          </ul>
          <h2>Python 2 vs Python 3</h2>
          <p>Python 2 is dead. Python 3 has been standard since 2008. Everything in this course is Python 3.</p>
          <div class="tip"><strong>💡 Tip</strong> You don't need to install anything to follow along. The code runner on every lesson page runs real Python 3 in your browser.</div>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Python 3 only — forget Python 2 exists</li>
            <li>Indentation is <em>syntax</em> — Python uses spaces instead of braces</li>
            <li>No semicolons needed at line ends</li>
          </ul></div>`,
        tryCode: `# Python is readable
name = "John"
age = 30
print("Hello, my name is", name)
print("I am", age, "years old")`
      },
      {
        id: 'm1l2', title: 'Your First Program',
        content: `
          <h2>Hello, World</h2>
          <p>The traditional first program prints a message to the screen. In Python, that's one line:</p>
          ${cb(`print("Hello, World!")`)}
          <h2>print()</h2>
          <p><code>print()</code> outputs text to the console. You can pass multiple values separated by commas — Python adds a space between them automatically.</p>
          ${cb(`print("Hello", "World")       # Hello World
print("Sum:", 3 + 4)           # Sum: 7
print("Line 1\\nLine 2")        # newline in string`)}
          <h2>Comments</h2>
          <p>Anything after <code>#</code> is a comment — Python ignores it. Use comments to explain <em>why</em>, not what.</p>
          ${cb(`# This is a comment
x = 5  # inline comment
# print("This won't run")
print(x)`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>print()</code> is a built-in function — parentheses are required</li>
            <li>Strings go in quotes — single or double both work</li>
            <li><code>#</code> starts a comment — everything after it is ignored</li>
            <li><code>\\n</code> inside a string is a newline character</li>
          </ul></div>`,
        tryCode: `# Edit this and run it
print("Hello, World!")
print("My name is", "John")
print(1 + 2 + 3)`
      },
      {
        id: 'm1l3', title: 'Running Python',
        content: `
          <h2>Ways to run Python</h2>
          <table>
            <tr><th>Method</th><th>How</th><th>Best for</th></tr>
            <tr><td>This site</td><td>Click ▶ Run</td><td>Learning right now</td></tr>
            <tr><td>REPL</td><td>Type <code>python3</code> in terminal</td><td>Quick experiments</td></tr>
            <tr><td>Script</td><td><code>python3 script.py</code></td><td>Real programs</td></tr>
            <tr><td>VS Code</td><td>Open .py file, hit ▶</td><td>Bigger projects</td></tr>
          </table>
          <h2>The REPL</h2>
          <p>REPL = Read-Eval-Print Loop. Type one line, Python runs it immediately. Good for testing ideas. You'll see <code>>>></code> as the prompt.</p>
          <h2>Script files</h2>
          <p>Save code in a <code>.py</code> file, run it with <code>python3 filename.py</code>. Most real Python work happens in script files.</p>
          <div class="note"><strong>📝 Note</strong> The interactive runner on this site uses Skulpt, a Python 3 interpreter compiled to JavaScript. It covers ~95% of the language — complex imports like <code>requests</code> or <code>numpy</code> won't work here, but everything in this course will.</div>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Script files have a <code>.py</code> extension</li>
            <li>The REPL is great for quick tests</li>
            <li>VS Code or PyCharm are the most popular editors for Python</li>
          </ul></div>`,
        tryCode: `# Try editing and running this
for i in range(5):
    print("Line", i + 1)
print("Done!")`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 2: Variables & Data Types
  // ─────────────────────────────────────────────
  {
    id: 'm2', title: 'Variables & Data Types', icon: '📦',
    description: 'How to store data: numbers, strings, booleans, None.',
    lessons: [
      {
        id: 'm2l1', title: 'Variables',
        content: `
          <h2>Variables</h2>
          <p>A variable is a name that points to a value. You create one with <code>=</code>.</p>
          ${cb(`name = "John"
age = 30
height = 5.11
print(name, age, height)`)}
          <h2>Naming Rules</h2>
          <ul>
            <li>Letters, digits, underscores only — no spaces or dashes</li>
            <li>Can't start with a digit</li>
            <li>Case-sensitive: <code>name</code> and <code>Name</code> are different</li>
            <li>Convention: use <code>snake_case</code> (underscores between words)</li>
          </ul>
          ${cb(`# Valid names
first_name = "Alice"
age2 = 25
_hidden = True

# Python convention
user_age = 30       # good
userAge = 30        # works, but not Pythonic
print(first_name, age2, _hidden, user_age)`)}
          <h2>Multiple Assignment</h2>
          ${cb(`x = y = z = 0          # all three = 0
a, b, c = 1, 2, 3     # unpack
print(x, y, z)
print(a, b, c)

# Swap without a temp variable
a, b = b, a
print(a, b)  # 2 1`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>No <code>var</code>, <code>let</code>, or <code>const</code> — just <code>name = value</code></li>
            <li>Python is dynamically typed — you can reassign to any type</li>
            <li>Use <code>snake_case</code> for variable names</li>
            <li>You can assign multiple variables at once with tuple unpacking</li>
          </ul></div>`,
        tryCode: `# Create variables and print them
first_name = "Your Name"
age = 25
is_student = True

print(first_name, "is", age, "years old")
print("Student:", is_student)

# Try swapping two values
x, y = 10, 20
x, y = y, x
print("After swap:", x, y)`
      },
      {
        id: 'm2l2', title: 'Numbers',
        content: `
          <h2>Integers</h2>
          <p>Whole numbers. No size limit in Python.</p>
          ${cb(`x = 42
big = 1_000_000   # underscores for readability
print(x, big)
print(type(x))    # <class 'int'>`)}
          <h2>Floats</h2>
          <p>Decimal numbers. Uses 64-bit IEEE 754 under the hood.</p>
          ${cb(`pi = 3.14159
temp = -7.5
print(pi, temp)
print(type(pi))   # <class 'float'>

# Floating point quirk
print(0.1 + 0.2)  # 0.30000000000000004 — expected!`)}
          <h2>Arithmetic</h2>
          ${cb(`print(10 + 3)   # 13  addition
print(10 - 3)   # 7   subtraction
print(10 * 3)   # 30  multiplication
print(10 / 3)   # 3.333... (always float)
print(10 // 3)  # 3   floor division (int)
print(10 % 3)   # 1   modulo (remainder)
print(10 ** 3)  # 1000 exponent`)}
          <h2>Useful built-ins</h2>
          ${cb(`print(abs(-5))       # 5
print(round(3.7))    # 4
print(round(3.14159, 2))  # 3.14
print(max(3, 7, 1))  # 7
print(min(3, 7, 1))  # 1
print(sum([1,2,3,4])) # 10`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>/</code> always returns a float; <code>//</code> returns an integer (floor)</li>
            <li><code>**</code> is the exponent operator</li>
            <li><code>%</code> is modulo — useful for checking even/odd: <code>n % 2 == 0</code></li>
            <li>Integers have unlimited precision</li>
          </ul></div>`,
        tryCode: `# Play with numbers
x = 17
y = 5

print("Add:", x + y)
print("Subtract:", x - y)
print("Multiply:", x * y)
print("Divide:", x / y)
print("Floor divide:", x // y)
print("Remainder:", x % y)
print("Power:", x ** 2)

# Is x even or odd?
if x % 2 == 0:
    print(x, "is even")
else:
    print(x, "is odd")`
      },
      {
        id: 'm2l3', title: 'Strings',
        content: `
          <h2>Strings</h2>
          <p>A string is a sequence of characters. Use single or double quotes — they're identical.</p>
          ${cb(`s1 = 'hello'
s2 = "world"
s3 = """Multi
line
string"""
print(s1, s2)
print(s3)`)}
          <h2>String Operations</h2>
          ${cb(`a = "hello"
b = "world"
print(a + " " + b)   # concatenation
print(a * 3)          # repetition: hellohellohello
print(len(a))         # 5 — length`)}
          <h2>Escape Characters</h2>
          ${cb(`print("She said \\"hello\\"")   # quotes inside string
print("Line1\\nLine2")        # newline
print("Tab\\there")           # tab
print("Backslash: \\\\")       # literal backslash`)}
          <h2>String Type</h2>
          ${cb(`name = "Alice"
print(type(name))   # <class 'str'>
print(name.upper())  # ALICE
print(name.lower())  # alice
print(name.replace("A", "a"))  # alice`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Strings are <em>immutable</em> — you can't change a character in place</li>
            <li><code>+</code> concatenates, <code>*</code> repeats</li>
            <li><code>len()</code> returns the number of characters</li>
            <li>More string methods covered in the Strings module</li>
          </ul></div>`,
        tryCode: `# String basics
greeting = "Hello"
name = "World"

# Combine them
message = greeting + ", " + name + "!"
print(message)

# Length
print("Length:", len(message))

# Repeat
print("-" * 20)

# Type check
print(type(greeting))`
      },
      {
        id: 'm2l4', title: 'Booleans & None',
        content: `
          <h2>Booleans</h2>
          <p>Two values: <code>True</code> and <code>False</code> (capitalized).</p>
          ${cb(`is_active = True
is_done = False
print(type(is_active))  # <class 'bool'>
print(True and False)   # False
print(True or False)    # True
print(not True)         # False`)}
          <h2>Truthy and Falsy</h2>
          <p>Python considers some values "falsy" (behave like <code>False</code> in conditions) even when they're not literally <code>False</code>.</p>
          ${cb(`# Falsy values
print(bool(0))      # False
print(bool(""))     # False
print(bool([]))     # False
print(bool(None))   # False

# Truthy values
print(bool(1))      # True
print(bool("hi"))   # True
print(bool([1,2]))  # True`)}
          <h2>None</h2>
          <p><code>None</code> represents "nothing" or "no value". It's Python's null.</p>
          ${cb(`result = None
print(result)
print(type(result))   # <class 'NoneType'>
print(result is None) # True — use 'is', not '=='`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>True</code> and <code>False</code> are capitalized</li>
            <li>Use <code>is None</code> and <code>is not None</code> to check for None</li>
            <li>0, empty string, empty list, and None are all falsy</li>
          </ul></div>`,
        tryCode: `# Booleans
x = 10
print(x > 5)    # True
print(x == 10)  # True
print(x != 3)   # True

# None
value = None
if value is None:
    print("No value set")

# Truthy/falsy
items = []
if not items:
    print("List is empty")`
      },
      {
        id: 'm2l5', title: 'Type Conversion',
        content: `
          <h2>Converting Between Types</h2>
          <p>Use built-in functions to convert values from one type to another.</p>
          ${cb(`# To integer
print(int("42"))     # 42
print(int(3.9))      # 3 (truncates, not rounds)
print(int(True))     # 1

# To float
print(float("3.14")) # 3.14
print(float(5))      # 5.0

# To string
print(str(42))       # "42"
print(str(3.14))     # "3.14"
print(str(True))     # "True"

# To boolean
print(bool(0))       # False
print(bool(1))       # True`)}
          <h2>Checking Types</h2>
          ${cb(`x = 42
print(type(x))            # <class 'int'>
print(isinstance(x, int)) # True
print(isinstance(x, str)) # False

# type() vs isinstance()
# isinstance() handles inheritance — prefer it for checks`)}
          <div class="warn"><strong>⚠️ Watch out</strong> <code>int("3.14")</code> raises an error — convert to float first: <code>int(float("3.14"))</code></div>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code> convert types</li>
            <li><code>int()</code> truncates floats — it does not round</li>
            <li>Use <code>isinstance()</code> to check a value's type</li>
          </ul></div>`,
        tryCode: `# Type conversion practice
user_input = "42"        # imagine this came from input()
number = int(user_input)
print(number + 8)        # 50

# String to float
price = float("19.99")
print(price * 2)

# Number to string
age = 30
message = "I am " + str(age) + " years old"
print(message)

# Check types
print(type(number))
print(isinstance(price, float))`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 3: Operators
  // ─────────────────────────────────────────────
  {
    id: 'm3', title: 'Operators', icon: '⚙️',
    description: 'Arithmetic, comparison, logical, and assignment operators.',
    lessons: [
      {
        id: 'm3l1', title: 'Comparison Operators',
        content: `
          <h2>Comparison Operators</h2>
          <p>Compare two values. Always return <code>True</code> or <code>False</code>.</p>
          ${cb(`x = 10
print(x == 10)   # True  — equal
print(x != 5)    # True  — not equal
print(x > 5)     # True  — greater than
print(x < 5)     # False — less than
print(x >= 10)   # True  — greater or equal
print(x <= 9)    # False — less or equal`)}
          <h2>Chained Comparisons</h2>
          <p>Python lets you chain comparisons like math notation.</p>
          ${cb(`age = 25
print(18 <= age <= 65)   # True — between 18 and 65
print(1 < 2 < 3 < 4)    # True

score = 72
grade = "B" if 70 <= score < 80 else "other"
print(grade)`)}
          <h2>Identity vs Equality</h2>
          ${cb(`a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)   # True  — same values
print(a is b)   # False — different objects
print(a is c)   # True  — same object in memory

# Always use 'is' for None checks
x = None
print(x is None)  # True`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>==</code> checks value equality; <code>is</code> checks object identity</li>
            <li>Always use <code>is None</code> / <code>is not None</code>, never <code>== None</code></li>
            <li>Chained comparisons work naturally: <code>0 &lt; x &lt; 10</code></li>
          </ul></div>`,
        tryCode: `x = 15

print(x == 15)
print(x != 10)
print(x > 10)
print(x < 20)

# Chained comparison
print(10 < x < 20)

# None check
val = None
print(val is None)`
      },
      {
        id: 'm3l2', title: 'Logical Operators',
        content: `
          <h2>and, or, not</h2>
          ${cb(`print(True and True)   # True
print(True and False)  # False
print(False or True)   # True
print(False or False)  # False
print(not True)        # False
print(not False)       # True`)}
          <h2>Short-Circuit Evaluation</h2>
          <p>Python stops evaluating as soon as the result is determined.</p>
          ${cb(`# 'and' — stops at first False
# 'or'  — stops at first True
x = 5
print(x > 0 and x < 10)  # True — both checked
print(x > 10 and x < 20) # False — stops after first

# Practical: guard against None before calling method
name = None
print(name and name.upper())  # None (short-circuits)

name = "alice"
print(name and name.upper())  # ALICE`)}
          <h2>or as a default</h2>
          ${cb(`# Common Python pattern: use 'or' for defaults
user_name = "" or "Anonymous"
print(user_name)   # Anonymous

setting = None or "default"
print(setting)     # default`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>and</code> returns the first falsy value, or the last value if all truthy</li>
            <li><code>or</code> returns the first truthy value, or the last value if all falsy</li>
            <li>Short-circuit evaluation means the right side may not run</li>
          </ul></div>`,
        tryCode: `age = 22
has_id = True

# Check both conditions
if age >= 18 and has_id:
    print("Access granted")

# Or for fallback
nickname = "" or "No nickname"
print(nickname)

# not
is_locked = False
if not is_locked:
    print("Door is open")`
      },
      {
        id: 'm3l3', title: 'Assignment Operators',
        content: `
          <h2>Augmented Assignment</h2>
          <p>Shortcuts that modify a variable in place.</p>
          ${cb(`x = 10
x += 5   # x = x + 5 → 15
x -= 3   # x = x - 3 → 12
x *= 2   # x = x * 2 → 24
x //= 4  # x = x // 4 → 6
x **= 2  # x = x ** 2 → 36
x %= 7   # x = x % 7 → 1
print(x)`)}
          <h2>Walrus Operator := (Python 3.8+)</h2>
          <p>Assigns and returns a value in the same expression.</p>
          ${cb(`# Without walrus
data = [1, 2, 3, 4, 5]
n = len(data)
if n > 3:
    print("Long list:", n)

# With walrus — assign inside the condition
if (n := len(data)) > 3:
    print("Long list:", n)`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>+=</code>, <code>-=</code>, <code>*=</code>, etc. are augmented assignment operators</li>
            <li><code>:=</code> (walrus) assigns a value as part of an expression</li>
          </ul></div>`,
        tryCode: `count = 0
count += 1
count += 1
count += 1
print("Count:", count)

total = 100
total -= 20
total *= 2
print("Total:", total)

# Walrus operator
items = ["apple", "banana", "cherry"]
if (n := len(items)) > 2:
    print("More than 2 items:", n)`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 4: Strings In Depth
  // ─────────────────────────────────────────────
  {
    id: 'm4', title: 'Strings In Depth', icon: '✍️',
    description: 'Indexing, slicing, methods, and f-strings.',
    lessons: [
      {
        id: 'm4l1', title: 'Indexing & Slicing',
        content: `
          <h2>Indexing</h2>
          <p>Each character in a string has an index. Python uses 0-based indexing.</p>
          ${cb(`s = "Python"
#    P  y  t  h  o  n
#    0  1  2  3  4  5
#   -6 -5 -4 -3 -2 -1

print(s[0])    # P
print(s[5])    # n
print(s[-1])   # n  (last char)
print(s[-2])   # o`)}
          <h2>Slicing</h2>
          <p>Extract a substring with <code>[start:stop:step]</code>. Stop is exclusive.</p>
          ${cb(`s = "Python"
print(s[0:3])   # Pyt — chars 0,1,2
print(s[2:])    # thon — from 2 to end
print(s[:3])    # Pyt — from start to 2
print(s[-3:])   # hon — last 3 chars
print(s[::2])   # Pto — every 2nd char
print(s[::-1])  # nohtyP — reversed`)}
          <h2>Strings are immutable</h2>
          ${cb(`s = "hello"
# s[0] = "H"  → TypeError! Can't change in place

# Instead, build a new string
s = "H" + s[1:]
print(s)  # Hello`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>First index is 0; last is <code>len(s) - 1</code></li>
            <li>Negative indexes count from the end: <code>-1</code> = last char</li>
            <li><code>s[::-1]</code> reverses a string</li>
            <li>Slice never raises IndexError — it just returns what it can</li>
          </ul></div>`,
        tryCode: `word = "Programming"

# First and last char
print(word[0], word[-1])

# First 4 chars
print(word[:4])

# Last 4 chars
print(word[-4:])

# Reverse it
print(word[::-1])

# Every other char
print(word[::2])`
      },
      {
        id: 'm4l2', title: 'String Methods',
        content: `
          <h2>Common String Methods</h2>
          <p>Methods are called with dot notation: <code>string.method()</code></p>
          ${cb(`s = "  Hello, World!  "

print(s.strip())          # remove leading/trailing whitespace
print(s.lower())          # hello, world!
print(s.upper())          # HELLO, WORLD!
print(s.title())          # Hello, World!

s2 = "hello world"
print(s2.replace("world", "Python"))  # hello Python
print(s2.split(" "))      # ['hello', 'world']

words = ["join", "these", "words"]
print(" ".join(words))    # join these words`)}
          <h2>Finding & Checking</h2>
          ${cb(`s = "Hello, World!"
print(s.find("World"))    # 7 (index), -1 if not found
print(s.count("l"))       # 3
print(s.startswith("Hello"))  # True
print(s.endswith("!"))        # True
print("World" in s)           # True`)}
          <h2>Splitting & Joining</h2>
          ${cb(`csv = "alice,bob,charlie"
names = csv.split(",")
print(names)         # ['alice', 'bob', 'charlie']
print(len(names))    # 3

# Join a list back to a string
result = " | ".join(names)
print(result)        # alice | bob | charlie`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>String methods return new strings — they don't modify in place</li>
            <li><code>strip()</code>, <code>lstrip()</code>, <code>rstrip()</code> remove whitespace</li>
            <li><code>split()</code> → list; <code>join()</code> → string</li>
            <li><code>in</code> operator checks for substrings</li>
          </ul></div>`,
        tryCode: `sentence = "  the quick brown fox  "

# Clean it up
clean = sentence.strip().title()
print(clean)

# Split into words
words = clean.split()
print(words)
print("Word count:", len(words))

# Check content
print(clean.startswith("The"))
print("Fox" in clean)

# Rejoin with dashes
print("-".join(words))`
      },
      {
        id: 'm4l3', title: 'f-Strings & Formatting',
        content: `
          <h2>f-Strings (Python 3.6+)</h2>
          <p>The modern way to embed variables in strings. Put an <code>f</code> before the quotes and use <code>{}</code> to embed expressions.</p>
          ${cb(`name = "Alice"
age = 30
print(f"Hello, {name}! You are {age} years old.")

# Any expression works inside {}
print(f"In 10 years you'll be {age + 10}")
print(f"Name has {len(name)} characters")
print(f"Upper: {name.upper()}")`)}
          <h2>Format Specifiers</h2>
          ${cb(`pi = 3.14159265
price = 1234567.89
ratio = 0.1234

print(f"Pi: {pi:.2f}")           # 2 decimal places
print(f"Price: \${price:,.2f}")    # comma separator
print(f"Ratio: {ratio:.1%}")      # as percent
print(f"{'left':<10}|")           # left-align in 10 chars
print(f"{'right':>10}|")          # right-align in 10 chars
print(f"{'center':^10}|")         # center in 10 chars`)}
          <h2>Older Formatting (you'll see this in existing code)</h2>
          ${cb(`name = "Bob"
age = 25

# .format() method
print("Hello, {}! Age: {}".format(name, age))
print("Hello, {name}! Age: {age}".format(name=name, age=age))

# % formatting (oldest — avoid in new code)
print("Hello, %s! Age: %d" % (name, age))`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>f-strings are the preferred way to format strings in modern Python</li>
            <li><code>:.2f</code> = 2 decimal places; <code>:,</code> = comma separator; <code>:.1%</code> = percent</li>
            <li>Any valid Python expression works inside <code>{}</code></li>
          </ul></div>`,
        tryCode: `name = "John"
salary = 75000.5
score = 0.873

# Basic f-string
print(f"Name: {name}")

# Format numbers
print(f"Salary: \${salary:,.2f}")
print(f"Score: {score:.1%}")

# Expressions in f-strings
items = ["a", "b", "c"]
print(f"Items: {len(items)}, First: {items[0].upper()}")`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 5: Control Flow
  // ─────────────────────────────────────────────
  {
    id: 'm5', title: 'Control Flow', icon: '🔀',
    description: 'Make decisions with if/elif/else.',
    lessons: [
      {
        id: 'm5l1', title: 'if / elif / else',
        content: `
          <h2>if Statement</h2>
          <p>Run a block of code only when a condition is True. Indentation (4 spaces) defines the block.</p>
          ${cb(`score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("Below C")`)}
          <h2>Nested if</h2>
          ${cb(`age = 20
has_ticket = True

if age >= 18:
    if has_ticket:
        print("Welcome!")
    else:
        print("Need a ticket")
else:
    print("Must be 18+")`)}
          <h2>Ternary / Conditional Expression</h2>
          <p>One-line if/else for simple assignments.</p>
          ${cb(`age = 20
status = "adult" if age >= 18 else "minor"
print(status)

x = 10
label = "positive" if x > 0 else "non-positive"
print(label)`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Indentation is mandatory — Python uses 4 spaces by convention</li>
            <li><code>elif</code> is "else if" — you can have as many as you need</li>
            <li><code>else</code> is optional and catches everything not caught above</li>
            <li>Ternary: <code>value_if_true if condition else value_if_false</code></li>
          </ul></div>`,
        tryCode: `temperature = 72

if temperature > 90:
    print("Hot")
elif temperature > 70:
    print("Warm")
elif temperature > 50:
    print("Cool")
else:
    print("Cold")

# Ternary
feels = "warm" if temperature > 70 else "cool"
print(f"It feels {feels}")`
      },
      {
        id: 'm5l2', title: 'match / case (Python 3.10+)',
        content: `
          <h2>match Statement</h2>
          <p>Python's structural pattern matching. Similar to switch/case in other languages but much more powerful.</p>
          ${cb(`command = "quit"

match command:
    case "quit":
        print("Quitting...")
    case "help":
        print("Showing help")
    case "start":
        print("Starting...")
    case _:
        print(f"Unknown command: {command}")`)}
          <h2>Matching Values</h2>
          ${cb(`point = (1, 0)

match point:
    case (0, 0):
        print("Origin")
    case (x, 0):
        print(f"On x-axis at {x}")
    case (0, y):
        print(f"On y-axis at {y}")
    case (x, y):
        print(f"At ({x}, {y})")`)}
          <div class="note"><strong>📝 Note</strong> <code>match</code>/<code>case</code> requires Python 3.10+. The interactive runner here supports it. Stick with <code>if/elif/else</code> if you need compatibility with older Python.</div>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>case _:</code> is the default/wildcard — catches everything</li>
            <li>Variables in patterns (like <code>x</code>, <code>y</code>) capture the matched value</li>
            <li>More powerful than switch — can match structures, types, and patterns</li>
          </ul></div>`,
        tryCode: `status_code = 404

match status_code:
    case 200:
        print("OK")
    case 404:
        print("Not Found")
    case 500:
        print("Server Error")
    case _:
        print(f"Code: {status_code}")`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 6: Loops
  // ─────────────────────────────────────────────
  {
    id: 'm6', title: 'Loops', icon: '🔁',
    description: 'Repeat code with while and for loops.',
    lessons: [
      {
        id: 'm6l1', title: 'while Loops',
        content: `
          <h2>while Loop</h2>
          <p>Repeats a block as long as a condition is True.</p>
          ${cb(`count = 0
while count < 5:
    print(count)
    count += 1
print("Done")`)}
          <h2>Infinite Loop with break</h2>
          ${cb(`# Simulate a game loop
lives = 3
while True:
    lives -= 1
    print(f"Lives: {lives}")
    if lives == 0:
        break
print("Game over")`)}
          <h2>while/else</h2>
          <p>The <code>else</code> clause runs when the condition becomes False — but NOT if the loop exited via <code>break</code>.</p>
          ${cb(`n = 10
while n > 0:
    n -= 3
else:
    print("Loop finished normally, n =", n)`)}
          <div class="warn"><strong>⚠️ Infinite loops</strong> If your while condition never becomes False and you have no <code>break</code>, the loop runs forever. Always make sure something in the loop changes the condition.</div>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Update the loop variable inside the loop or you'll loop forever</li>
            <li><code>break</code> exits immediately; <code>continue</code> skips to next iteration</li>
            <li><code>while True:</code> + <code>break</code> is a common pattern for "loop until condition"</li>
          </ul></div>`,
        tryCode: `# Count down
n = 5
while n > 0:
    print(n)
    n -= 1
print("Blast off!")

# Sum until over 20
total = 0
addend = 1
while total <= 20:
    total += addend
    addend += 1
print("Total:", total)`
      },
      {
        id: 'm6l2', title: 'for Loops',
        content: `
          <h2>for Loop</h2>
          <p>Iterates over any sequence — list, string, range, etc.</p>
          ${cb(`fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Over a string
for char in "hello":
    print(char)`)}
          <h2>range()</h2>
          ${cb(`for i in range(5):      # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8):   # 2, 3, 4, 5, 6, 7
    print(i)

for i in range(0, 10, 2):  # 0, 2, 4, 6, 8 (step=2)
    print(i)

for i in range(5, 0, -1):  # 5, 4, 3, 2, 1 (countdown)
    print(i)`)}
          <h2>enumerate()</h2>
          <p>Get both the index and value in a loop.</p>
          ${cb(`names = ["Alice", "Bob", "Charlie"]
for i, name in enumerate(names):
    print(f"{i}: {name}")

# Start index at 1
for i, name in enumerate(names, start=1):
    print(f"{i}. {name}")`)}
          <h2>zip()</h2>
          <p>Loop over two lists in parallel.</p>
          ${cb(`names = ["Alice", "Bob", "Charlie"]
scores = [92, 87, 95]
for name, score in zip(names, scores):
    print(f"{name}: {score}")`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>range(stop)</code>, <code>range(start, stop)</code>, <code>range(start, stop, step)</code></li>
            <li><code>enumerate()</code> gives you <code>(index, value)</code> pairs</li>
            <li><code>zip()</code> pairs elements from multiple sequences</li>
            <li><code>for _ in range(n):</code> — use <code>_</code> when you don't need the variable</li>
          </ul></div>`,
        tryCode: `# Loop over a list
colors = ["red", "green", "blue"]
for color in colors:
    print(color.upper())

print("---")

# With enumerate
for i, color in enumerate(colors, 1):
    print(f"{i}. {color}")

print("---")

# Range
total = 0
for n in range(1, 11):
    total += n
print("Sum 1-10:", total)`
      },
      {
        id: 'm6l3', title: 'break, continue, pass',
        content: `
          <h2>break</h2>
          <p>Exit the loop immediately.</p>
          ${cb(`for i in range(10):
    if i == 5:
        break
    print(i)
# prints 0 1 2 3 4`)}
          <h2>continue</h2>
          <p>Skip the rest of this iteration, go to the next.</p>
          ${cb(`for i in range(10):
    if i % 2 == 0:
        continue    # skip even numbers
    print(i)
# prints 1 3 5 7 9`)}
          <h2>pass</h2>
          <p>Do nothing. A placeholder for empty blocks.</p>
          ${cb(`for i in range(5):
    if i == 3:
        pass        # placeholder — do nothing for 3
    else:
        print(i)

# Also used for empty functions/classes
def todo_function():
    pass  # implement later`)}
          <h2>for/else</h2>
          ${cb(`# else runs if the loop completed without break
target = 7
for n in range(10):
    if n == target:
        print("Found", n)
        break
else:
    print("Not found")`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>break</code> exits the loop; <code>continue</code> skips to the next iteration</li>
            <li><code>pass</code> is a no-op — use it as a placeholder</li>
            <li><code>for/else</code>: the <code>else</code> runs only if the loop didn't <code>break</code></li>
          </ul></div>`,
        tryCode: `# Find first even number > 10
numbers = [3, 7, 11, 4, 16, 9, 12]
for n in numbers:
    if n > 10 and n % 2 == 0:
        print("Found:", n)
        break

# Skip negatives
data = [5, -3, 8, -1, 4, -9, 7]
positives = []
for n in data:
    if n < 0:
        continue
    positives.append(n)
print("Positives:", positives)`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 7: Functions
  // ─────────────────────────────────────────────
  {
    id: 'm7', title: 'Functions', icon: '🧩',
    description: 'Define reusable blocks of code.',
    lessons: [
      {
        id: 'm7l1', title: 'Defining Functions',
        content: `
          <h2>def</h2>
          <p>Define a function with the <code>def</code> keyword. Call it by name with parentheses.</p>
          ${cb(`def greet():
    print("Hello!")

greet()    # call it
greet()    # call it again`)}
          <h2>Parameters and Arguments</h2>
          ${cb(`def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
greet("Bob")`)}
          <h2>Return Values</h2>
          ${cb(`def add(a, b):
    return a + b

result = add(3, 4)
print(result)   # 7

# Functions return None if no return statement
def no_return():
    x = 1 + 1

print(no_return())  # None`)}
          <h2>Multiple Return Values</h2>
          ${cb(`def min_max(numbers):
    return min(numbers), max(numbers)  # returns a tuple

lo, hi = min_max([3, 1, 4, 1, 5, 9])
print(lo, hi)  # 1 9`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Function body must be indented</li>
            <li><code>return</code> exits the function and sends back a value</li>
            <li>No <code>return</code> → function returns <code>None</code></li>
            <li>You can return multiple values — they come back as a tuple</li>
          </ul></div>`,
        tryCode: `def square(n):
    return n * n

def cube(n):
    return n ** 3

print(square(5))
print(cube(3))

# Function that returns two values
def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide(17, 5)
print(f"17 / 5 = {q} remainder {r}")`
      },
      {
        id: 'm7l2', title: 'Default & Keyword Arguments',
        content: `
          <h2>Default Parameters</h2>
          <p>Give a parameter a default value — callers can omit it.</p>
          ${cb(`def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")             # Hello, Alice!
greet("Bob", "Hi")         # Hi, Bob!
greet("Carol", greeting="Hey")  # Hey, Carol!`)}
          <h2>Keyword Arguments</h2>
          <p>Pass arguments by name — order doesn't matter.</p>
          ${cb(`def create_user(name, age, city="Unknown"):
    print(f"{name}, age {age}, from {city}")

create_user("Alice", 30, "Atlanta")
create_user(age=25, name="Bob")  # keyword args, any order
create_user("Carol", city="NYC", age=28)`)}
          <h2>*args — Variable Positional Arguments</h2>
          ${cb(`def add_all(*numbers):
    return sum(numbers)

print(add_all(1, 2, 3))        # 6
print(add_all(1, 2, 3, 4, 5))  # 15

def log(level, *messages):
    for msg in messages:
        print(f"[{level}] {msg}")`)}
          <h2>**kwargs — Variable Keyword Arguments</h2>
          ${cb(`def print_info(**data):
    for key, value in data.items():
        print(f"  {key}: {value}")

print_info(name="Alice", age=30, city="Atlanta")

# Combining *args and **kwargs
def everything(*args, **kwargs):
    print("args:", args)
    print("kwargs:", kwargs)

everything(1, 2, 3, name="Alice", role="admin")`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Default params must come after required params</li>
            <li><code>*args</code> collects extra positional args into a tuple</li>
            <li><code>**kwargs</code> collects extra keyword args into a dict</li>
            <li>Order: <code>def f(pos, default=val, *args, **kwargs)</code></li>
          </ul></div>`,
        tryCode: `def describe_pet(name, species="dog", age=None):
    desc = f"{name} is a {species}"
    if age:
        desc += f", age {age}"
    print(desc)

describe_pet("Rex")
describe_pet("Whiskers", "cat")
describe_pet("Goldie", "fish", age=2)

# *args
def total(*nums):
    return sum(nums)

print(total(1, 2, 3, 4, 5))`
      },
      {
        id: 'm7l3', title: 'Lambda & Scope',
        content: `
          <h2>Lambda Functions</h2>
          <p>Anonymous one-line functions. Use when a short function is needed inline.</p>
          ${cb(`square = lambda x: x * x
print(square(5))  # 25

add = lambda a, b: a + b
print(add(3, 4))  # 7

# Common use: sorting
people = [("Alice", 30), ("Bob", 25), ("Carol", 35)]
people.sort(key=lambda p: p[1])  # sort by age
print(people)`)}
          <h2>Scope — LEGB Rule</h2>
          <p>Python looks up variables in this order: <strong>L</strong>ocal → <strong>E</strong>nclosing → <strong>G</strong>lobal → <strong>B</strong>uilt-in.</p>
          ${cb(`x = "global"

def outer():
    x = "enclosing"
    def inner():
        x = "local"
        print(x)  # local
    inner()
    print(x)  # enclosing

outer()
print(x)  # global`)}
          <h2>global and nonlocal</h2>
          ${cb(`count = 0

def increment():
    global count      # reference the global variable
    count += 1

increment()
increment()
print(count)  # 2`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>lambda x: expr</code> — no <code>def</code>, no <code>return</code>, one expression only</li>
            <li>Variables inside a function are local by default</li>
            <li>Use <code>global</code> to modify a global variable from inside a function</li>
            <li>Use <code>nonlocal</code> to modify a variable in an enclosing (not global) scope</li>
          </ul></div>`,
        tryCode: `# Lambda for sorting
words = ["banana", "apple", "cherry", "date"]
words.sort(key=lambda w: len(w))  # sort by length
print(words)

# Scope
total = 0

def add_to_total(n):
    global total
    total += n

add_to_total(10)
add_to_total(20)
add_to_total(30)
print("Total:", total)`
      },
      {
        id: 'm7l4', title: 'Recursion',
        content: `
          <h2>Recursion</h2>
          <p>A function that calls itself. Every recursive function needs a base case to stop.</p>
          ${cb(`def factorial(n):
    if n <= 1:          # base case
        return 1
    return n * factorial(n - 1)  # recursive case

print(factorial(5))   # 120
print(factorial(10))  # 3628800`)}
          <h2>Fibonacci</h2>
          ${cb(`def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

for i in range(10):
    print(fib(i), end=" ")
print()`)}
          <h2>Recursion vs Iteration</h2>
          ${cb(`# Recursive sum
def sum_recursive(nums):
    if not nums:
        return 0
    return nums[0] + sum_recursive(nums[1:])

# Iterative sum — usually preferred
def sum_iterative(nums):
    return sum(nums)

data = [1, 2, 3, 4, 5]
print(sum_recursive(data))
print(sum_iterative(data))`)}
          <div class="note"><strong>📝 Note</strong> Python has a default recursion limit of ~1000. For deep recursion, iteration or <code>sys.setrecursionlimit()</code> is needed. Prefer iteration when performance matters.</div>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Every recursive function needs a base case — without it, you get infinite recursion</li>
            <li>Recursion is elegant for tree/graph problems</li>
            <li>Iteration is usually faster and doesn't risk stack overflow</li>
          </ul></div>`,
        tryCode: `def countdown(n):
    if n <= 0:
        print("Go!")
        return
    print(n)
    countdown(n - 1)

countdown(5)

# Power function
def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

print(power(2, 10))`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 8: Data Structures
  // ─────────────────────────────────────────────
  {
    id: 'm8', title: 'Data Structures', icon: '🗂️',
    description: 'Lists, tuples, dictionaries, and sets.',
    lessons: [
      {
        id: 'm8l1', title: 'Lists',
        content: `
          <h2>Lists</h2>
          <p>An ordered, mutable collection. The most-used data structure in Python.</p>
          ${cb(`fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", True, 3.14, None]
empty = []

print(fruits[0])     # apple
print(fruits[-1])    # cherry
print(fruits[1:])    # ['banana', 'cherry']`)}
          <h2>Modifying Lists</h2>
          ${cb(`fruits = ["apple", "banana"]

fruits.append("cherry")        # add to end
fruits.insert(1, "blueberry")  # insert at index
fruits.extend(["mango", "kiwi"])  # add multiple

print(fruits)

fruits.remove("banana")        # remove by value
popped = fruits.pop()          # remove & return last
popped2 = fruits.pop(0)        # remove & return at index

print(fruits)
print(popped, popped2)`)}
          <h2>Searching & Sorting</h2>
          ${cb(`nums = [3, 1, 4, 1, 5, 9, 2, 6]
print(len(nums))         # 8
print(nums.count(1))     # 2
print(nums.index(5))     # 4 (first occurrence)
print(5 in nums)         # True

nums.sort()
print(nums)              # sorted in place

nums.reverse()
print(nums)              # reversed

# sorted() returns new list
original = [3, 1, 4, 1, 5]
new = sorted(original)
print(original)  # unchanged
print(new)`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Lists are mutable — you can change, add, remove elements</li>
            <li><code>append()</code> adds one item; <code>extend()</code> adds many; <code>insert(i, x)</code> at index</li>
            <li><code>sort()</code> modifies in place; <code>sorted()</code> returns a new sorted list</li>
            <li><code>pop()</code> removes and returns the last item (or item at index)</li>
          </ul></div>`,
        tryCode: `# Build a to-do list
todos = []
todos.append("Buy groceries")
todos.append("Write code")
todos.append("Read a book")
todos.insert(0, "Wake up")

print("To-do list:")
for i, task in enumerate(todos, 1):
    print(f"  {i}. {task}")

# Remove completed
todos.remove("Wake up")
print(f"\\nRemaining: {len(todos)} tasks")`
      },
      {
        id: 'm8l2', title: 'Tuples',
        content: `
          <h2>Tuples</h2>
          <p>Like lists but immutable — cannot be changed after creation. Use them for data that shouldn't change.</p>
          ${cb(`point = (3, 4)
rgb = (255, 128, 0)
single = (42,)      # trailing comma for single-element tuple
empty = ()

print(point[0])     # 3
print(point[-1])    # 4
print(len(rgb))     # 3`)}
          <h2>Unpacking</h2>
          ${cb(`point = (10, 20, 30)
x, y, z = point
print(x, y, z)

# Extended unpacking
first, *rest = [1, 2, 3, 4, 5]
print(first)   # 1
print(rest)    # [2, 3, 4, 5]

*start, last = [1, 2, 3, 4, 5]
print(start)   # [1, 2, 3, 4]
print(last)    # 5`)}
          <h2>When to use Tuples vs Lists</h2>
          <table>
            <tr><th>Tuples</th><th>Lists</th></tr>
            <tr><td>Fixed data (coordinates, RGB, DB rows)</td><td>Dynamic collections</td></tr>
            <tr><td>Dictionary keys (lists can't be keys)</td><td>When you need to add/remove</td></tr>
            <tr><td>Multiple return values from functions</td><td>Sorted data</td></tr>
          </table>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Tuples are immutable — no append, remove, sort</li>
            <li>Slightly faster than lists for read-only data</li>
            <li>Can be used as dictionary keys (lists cannot)</li>
            <li>Tuple unpacking: <code>a, b = (1, 2)</code></li>
          </ul></div>`,
        tryCode: `# Tuples for fixed data
location = (33.749, -84.388)  # Atlanta coordinates
lat, lon = location
print(f"Lat: {lat}, Lon: {lon}")

# Multiple return values (actually a tuple)
def get_name():
    return "John", "Ozuna"

first, last = get_name()
print(f"{first} {last}")

# Extended unpacking
scores = [95, 87, 72, 91, 88]
best, *others = sorted(scores, reverse=True)
print(f"Best: {best}, Rest: {others}")`
      },
      {
        id: 'm8l3', title: 'Dictionaries',
        content: `
          <h2>Dictionaries</h2>
          <p>Key-value pairs. Keys must be unique and hashable. As of Python 3.7+, insertion order is preserved.</p>
          ${cb(`person = {"name": "Alice", "age": 30, "city": "Atlanta"}

print(person["name"])     # Alice
print(person.get("age"))  # 30
print(person.get("zip", "N/A"))  # N/A (default if missing)`)}
          <h2>Modifying</h2>
          ${cb(`person = {"name": "Alice", "age": 30}

person["age"] = 31          # update existing
person["email"] = "a@b.com" # add new key
del person["age"]           # delete key

print(person)

# Update multiple at once
person.update({"city": "NYC", "phone": "555-0100"})
print(person)`)}
          <h2>Iterating</h2>
          ${cb(`data = {"a": 1, "b": 2, "c": 3}

for key in data:           # keys
    print(key)

for value in data.values():  # values
    print(value)

for key, value in data.items():  # both
    print(f"{key} = {value}")`)}
          <h2>Common Patterns</h2>
          ${cb(`# Check if key exists
d = {"name": "Alice"}
print("name" in d)          # True
print("age" in d)           # False

# setdefault — add if missing, return value
d.setdefault("age", 0)
print(d)

# pop — remove and return
val = d.pop("age", None)    # None if missing
print(val)`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Use <code>.get(key, default)</code> to avoid KeyError on missing keys</li>
            <li><code>key in dict</code> checks for key existence</li>
            <li><code>.items()</code> returns (key, value) pairs for iteration</li>
            <li>Dictionary order is insertion order (Python 3.7+)</li>
          </ul></div>`,
        tryCode: `# Camera status tracker
cameras = {
    "CAM-001": "online",
    "CAM-002": "offline",
    "CAM-003": "online",
    "CAM-004": "problem",
}

# Count statuses
counts = {}
for status in cameras.values():
    counts[status] = counts.get(status, 0) + 1

print("Status summary:")
for status, count in counts.items():
    print(f"  {status}: {count}")`
      },
      {
        id: 'm8l4', title: 'Sets',
        content: `
          <h2>Sets</h2>
          <p>An unordered collection of unique values. Great for membership tests and removing duplicates.</p>
          ${cb(`fruits = {"apple", "banana", "cherry"}
print(fruits)
print(type(fruits))

# No duplicates
nums = {1, 2, 2, 3, 3, 3}
print(nums)   # {1, 2, 3}

# Empty set (NOT {})
empty = set()  # {} creates an empty dict!`)}
          <h2>Set Operations</h2>
          ${cb(`a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)   # union: {1,2,3,4,5,6}
print(a & b)   # intersection: {3,4}
print(a - b)   # difference: {1,2}
print(a ^ b)   # symmetric diff: {1,2,5,6}`)}
          <h2>Membership & Modification</h2>
          ${cb(`tags = {"python", "web", "data"}
print("python" in tags)  # True (O(1) lookup!)

tags.add("api")
tags.discard("web")       # no error if missing
tags.remove("data")       # KeyError if missing

print(tags)`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Sets have O(1) membership test — much faster than lists for large data</li>
            <li>Use sets to deduplicate: <code>list(set(my_list))</code></li>
            <li>Sets are unordered — no indexing</li>
            <li>Create empty set with <code>set()</code>, not <code>{}</code></li>
          </ul></div>`,
        tryCode: `# Deduplicate a list
emails = ["a@b.com", "c@d.com", "a@b.com", "e@f.com", "c@d.com"]
unique = list(set(emails))
print("Unique emails:", len(unique))

# Find common items
team_a = {"Alice", "Bob", "Carol", "Dave"}
team_b = {"Carol", "Dave", "Eve", "Frank"}

both = team_a & team_b
print("On both teams:", both)

only_a = team_a - team_b
print("Only on A:", only_a)`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 9: Comprehensions
  // ─────────────────────────────────────────────
  {
    id: 'm9', title: 'Comprehensions', icon: '⚡',
    description: 'Build lists, dicts, and sets in one line.',
    lessons: [
      {
        id: 'm9l1', title: 'List Comprehensions',
        content: `
          <h2>List Comprehensions</h2>
          <p>A concise way to build lists. Replaces most <code>for</code> loops that build a list.</p>
          ${cb(`# Traditional
squares = []
for n in range(1, 6):
    squares.append(n ** 2)

# Comprehension
squares = [n ** 2 for n in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]`)}
          <h2>With Filter</h2>
          ${cb(`# Add an if clause to filter
evens = [n for n in range(20) if n % 2 == 0]
print(evens)

# Transform strings
words = ["hello", "world", "python"]
upper = [w.upper() for w in words]
print(upper)

# Filter and transform
long_upper = [w.upper() for w in words if len(w) > 4]
print(long_upper)`)}
          <h2>Nested Comprehensions</h2>
          ${cb(`# Flatten a 2D list
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat = [n for row in matrix for n in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# 3x3 multiplication table
table = [[i*j for j in range(1,4)] for i in range(1,4)]
for row in table:
    print(row)`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Syntax: <code>[expr for item in iterable if condition]</code></li>
            <li>More readable and often faster than equivalent for loops</li>
            <li>Don't over-nest — if it's hard to read, use a regular loop</li>
          </ul></div>`,
        tryCode: `# Build comprehensions
numbers = range(1, 11)

# Squares
squares = [n**2 for n in numbers]
print("Squares:", squares)

# Even numbers only
evens = [n for n in numbers if n % 2 == 0]
print("Evens:", evens)

# Strings to uppercase and filtered
words = ["apple", "ant", "banana", "avocado", "cherry"]
a_words = [w.upper() for w in words if w.startswith("a")]
print("A-words:", a_words)`
      },
      {
        id: 'm9l2', title: 'Dict & Set Comprehensions',
        content: `
          <h2>Dictionary Comprehensions</h2>
          ${cb(`# {key: value for item in iterable}
names = ["alice", "bob", "charlie"]
lengths = {name: len(name) for name in names}
print(lengths)

# Square lookup table
squares = {n: n**2 for n in range(1, 6)}
print(squares)

# Filter items from existing dict
prices = {"apple": 1.5, "banana": 0.5, "cherry": 3.0}
expensive = {k: v for k, v in prices.items() if v > 1.0}
print(expensive)`)}
          <h2>Set Comprehensions</h2>
          ${cb(`words = ["hello", "world", "hello", "python"]
unique_lengths = {len(w) for w in words}
print(unique_lengths)  # {5, 6} — unique lengths`)}
          <h2>Generator Expressions</h2>
          <p>Like list comprehensions but lazy — they compute values on demand. Use <code>()</code> instead of <code>[]</code>.</p>
          ${cb(`# List comprehension — builds entire list in memory
squares_list = [n**2 for n in range(1000)]

# Generator — computes one at a time
squares_gen = (n**2 for n in range(1000))

# Use sum() with generator (no intermediate list)
total = sum(n**2 for n in range(1000))
print(total)

# Good for large data
big_total = sum(n for n in range(1_000_000) if n % 3 == 0)
print(big_total)`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Dict: <code>{k: v for ...}</code> — Set: <code>{expr for ...}</code></li>
            <li>Generator: <code>(expr for ...)</code> — lazy, memory-efficient</li>
            <li>Pass generators directly to <code>sum()</code>, <code>max()</code>, <code>any()</code>, <code>all()</code></li>
          </ul></div>`,
        tryCode: `# Dict comprehension
words = ["Python", "is", "awesome"]
word_lengths = {w: len(w) for w in words}
print(word_lengths)

# Invert a dict
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)

# Generator with sum
total = sum(n**2 for n in range(1, 6))
print("Sum of squares 1-5:", total)`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 10: Error Handling
  // ─────────────────────────────────────────────
  {
    id: 'm10', title: 'Error Handling', icon: '🛡️',
    description: 'Handle exceptions gracefully with try/except.',
    lessons: [
      {
        id: 'm10l1', title: 'Exceptions',
        content: `
          <h2>What are Exceptions?</h2>
          <p>When Python hits an error, it raises an exception. If unhandled, the program crashes with a traceback.</p>
          ${cb(`# These all raise exceptions — try running them one at a time

# ZeroDivisionError
# print(1 / 0)

# TypeError
# print("2" + 2)

# IndexError
# lst = [1, 2, 3]
# print(lst[10])

# KeyError
# d = {"a": 1}
# print(d["b"])

# ValueError
# int("hello")

# AttributeError
# "hello".nonexistent()

print("All the above would crash Python if uncommented")`)}
          <h2>Common Built-in Exceptions</h2>
          <table>
            <tr><th>Exception</th><th>When</th></tr>
            <tr><td><code>TypeError</code></td><td>Wrong type for operation</td></tr>
            <tr><td><code>ValueError</code></td><td>Right type, wrong value</td></tr>
            <tr><td><code>IndexError</code></td><td>List index out of range</td></tr>
            <tr><td><code>KeyError</code></td><td>Dict key doesn't exist</td></tr>
            <tr><td><code>AttributeError</code></td><td>Object has no such attribute</td></tr>
            <tr><td><code>FileNotFoundError</code></td><td>File doesn't exist</td></tr>
            <tr><td><code>ZeroDivisionError</code></td><td>Divide by zero</td></tr>
            <tr><td><code>ImportError</code></td><td>Module not found</td></tr>
          </table>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Every exception has a type, a message, and a traceback</li>
            <li>Read tracebacks bottom-up — the last line is the actual error</li>
            <li>Exceptions propagate up the call stack until handled</li>
          </ul></div>`,
        tryCode: `# Safely trigger some common exceptions
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Caught: {e}")

try:
    number = int("not a number")
except ValueError as e:
    print(f"Caught: {e}")

try:
    lst = [1, 2, 3]
    print(lst[99])
except IndexError as e:
    print(f"Caught: {e}")`
      },
      {
        id: 'm10l2', title: 'try / except / finally',
        content: `
          <h2>try / except</h2>
          ${cb(`try:
    result = int("abc")
except ValueError:
    print("That wasn't a number")

# Catch the exception object
try:
    x = 1 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")`)}
          <h2>Multiple except Clauses</h2>
          ${cb(`def parse(text):
    try:
        return int(text)
    except ValueError:
        try:
            return float(text)
        except ValueError:
            return None

def safe_divide(a, b):
    try:
        return a / b
    except (ZeroDivisionError, TypeError) as e:
        print(f"Can't divide: {e}")
        return None

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide(10, "x"))`)}
          <h2>else and finally</h2>
          ${cb(`def read_number(s):
    try:
        n = int(s)
    except ValueError:
        print("Not a number!")
    else:
        print(f"Got: {n}")   # runs only if no exception
    finally:
        print("Always runs") # always runs, exception or not

read_number("42")
print("---")
read_number("abc")`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>except ExceptionType as e:</code> captures the exception</li>
            <li><code>except (A, B):</code> catches multiple exception types</li>
            <li><code>else</code> runs only when no exception occurred</li>
            <li><code>finally</code> always runs — use for cleanup (close files, etc.)</li>
          </ul></div>`,
        tryCode: `def safe_int(text):
    try:
        return int(text)
    except ValueError:
        return None
    except TypeError:
        return None

tests = ["42", "3.14", "hello", None, "100"]
for t in tests:
    result = safe_int(t)
    if result is not None:
        print(f"'{t}' -> {result}")
    else:
        print(f"'{t}' -> could not convert")`
      },
      {
        id: 'm10l3', title: 'Raising & Custom Exceptions',
        content: `
          <h2>raise</h2>
          <p>Raise an exception yourself when something is wrong.</p>
          ${cb(`def set_age(age):
    if not isinstance(age, int):
        raise TypeError(f"Age must be int, got {type(age).__name__}")
    if age < 0 or age > 150:
        raise ValueError(f"Age {age} is out of valid range")
    return age

print(set_age(25))

try:
    set_age(-5)
except ValueError as e:
    print(f"Error: {e}")`)}
          <h2>Custom Exceptions</h2>
          ${cb(`class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Need \${amount:.2f} but only have \${balance:.2f}"
        )

class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

account = BankAccount(100)
try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Transaction failed: {e}")`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>raise ExceptionType("message")</code> raises an exception</li>
            <li>Custom exceptions inherit from <code>Exception</code> (or a subclass)</li>
            <li>Use custom exceptions to make errors meaningful in your domain</li>
            <li><code>raise</code> alone (inside an except block) re-raises the current exception</li>
          </ul></div>`,
        tryCode: `class ValidationError(Exception):
    pass

def validate_email(email):
    if "@" not in email:
        raise ValidationError(f"'{email}' is not a valid email")
    if "." not in email.split("@")[1]:
        raise ValidationError(f"'{email}' has no domain extension")
    return email

emails = ["user@example.com", "notanemail", "bad@nodot"]
for email in emails:
    try:
        result = validate_email(email)
        print(f"Valid: {result}")
    except ValidationError as e:
        print(f"Invalid: {e}")`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 11: File I/O
  // ─────────────────────────────────────────────
  {
    id: 'm11', title: 'File I/O', icon: '📁',
    description: 'Read and write files with Python.',
    lessons: [
      {
        id: 'm11l1', title: 'Reading Files',
        content: `
          <h2>open() and with</h2>
          <p>Always use the <code>with</code> statement to open files — it closes the file automatically.</p>
          ${cb(`# Basic pattern (file must exist on your system)
# with open("myfile.txt", "r") as f:
#     content = f.read()
#     print(content)

# Reading methods:
# f.read()         → entire file as one string
# f.readline()     → one line at a time
# f.readlines()    → list of all lines

# Iterating line by line (memory efficient)
# with open("myfile.txt") as f:
#     for line in f:
#         print(line.strip())

print("File reading patterns shown above")`)}
          <h2>File Modes</h2>
          <table>
            <tr><th>Mode</th><th>Meaning</th></tr>
            <tr><td><code>"r"</code></td><td>Read (default)</td></tr>
            <tr><td><code>"w"</code></td><td>Write (overwrites)</td></tr>
            <tr><td><code>"a"</code></td><td>Append</td></tr>
            <tr><td><code>"x"</code></td><td>Create (fails if exists)</td></tr>
            <tr><td><code>"rb"</code></td><td>Read binary</td></tr>
            <tr><td><code>"r+"</code></td><td>Read + write</td></tr>
          </table>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Always use <code>with open()</code> — it guarantees the file is closed</li>
            <li>Default mode is <code>"r"</code> (read text)</li>
            <li><code>f.read()</code> reads the whole file; iterate over <code>f</code> for line-by-line</li>
          </ul></div>`,
        tryCode: `# Simulate file reading with a string
import io

fake_file = io.StringIO("line 1\\nline 2\\nline 3\\n")
for line in fake_file:
    print(line.strip())

# String split simulating file lines
content = "Alice,30\\nBob,25\\nCarol,35"
for line in content.splitlines():
    name, age = line.split(",")
    print(f"{name} is {age} years old")`
      },
      {
        id: 'm11l2', title: 'Writing Files',
        content: `
          <h2>Writing</h2>
          ${cb(`# Write a new file (overwrites if exists)
# with open("output.txt", "w") as f:
#     f.write("Hello, World!\\n")
#     f.write("Second line\\n")

# Append to existing file
# with open("output.txt", "a") as f:
#     f.write("Appended line\\n")

# Write multiple lines
# lines = ["line 1", "line 2", "line 3"]
# with open("output.txt", "w") as f:
#     f.writelines(line + "\\n" for line in lines)

print("Writing patterns shown above")`)}
          <h2>Working with JSON</h2>
          <p>The <code>json</code> module handles reading/writing JSON files — very common in Python.</p>
          ${cb(`import json

# Python dict → JSON string
data = {"name": "Alice", "age": 30, "scores": [95, 87, 92]}
json_str = json.dumps(data, indent=2)
print(json_str)

# JSON string → Python dict
parsed = json.loads(json_str)
print(parsed["name"])
print(parsed["scores"])`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>"w"</code> overwrites; <code>"a"</code> appends</li>
            <li><code>f.write()</code> takes a string; use <code>str()</code> to write numbers</li>
            <li><code>json.dumps()</code> → JSON string; <code>json.loads()</code> → Python object</li>
            <li><code>json.dump(obj, f)</code> writes to a file; <code>json.load(f)</code> reads from a file</li>
          </ul></div>`,
        tryCode: `import json

# Build a data structure
records = [
    {"id": 1, "name": "Alice", "active": True},
    {"id": 2, "name": "Bob", "active": False},
    {"id": 3, "name": "Carol", "active": True},
]

# Serialize to JSON
json_str = json.dumps(records, indent=2)
print(json_str)

# Parse it back
loaded = json.loads(json_str)
active_users = [r["name"] for r in loaded if r["active"]]
print("Active:", active_users)`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 12: OOP
  // ─────────────────────────────────────────────
  {
    id: 'm12', title: 'Object-Oriented Programming', icon: '🏗️',
    description: 'Classes, objects, inheritance, and special methods.',
    lessons: [
      {
        id: 'm12l1', title: 'Classes & Objects',
        content: `
          <h2>Classes</h2>
          <p>A class is a blueprint. An object is an instance created from that blueprint.</p>
          ${cb(`class Dog:
    def __init__(self, name, breed):
        self.name = name      # instance attribute
        self.breed = breed

    def bark(self):
        print(f"{self.name} says: Woof!")

    def describe(self):
        print(f"{self.name} is a {self.breed}")

rex = Dog("Rex", "German Shepherd")
buddy = Dog("Buddy", "Golden Retriever")

rex.bark()
buddy.describe()
print(rex.name)`)}
          <h2>__init__</h2>
          <p><code>__init__</code> runs when an object is created. <code>self</code> is the object itself.</p>
          ${cb(`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

r = Rectangle(5, 3)
print("Area:", r.area())
print("Perimeter:", r.perimeter())`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Class names use <code>PascalCase</code></li>
            <li><code>self</code> is the first parameter of every instance method</li>
            <li><code>__init__</code> initializes the object's attributes</li>
            <li>Create instances by calling the class like a function: <code>obj = MyClass()</code></li>
          </ul></div>`,
        tryCode: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited \${amount}. Balance: \${self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds")
        else:
            self.balance -= amount
            print(f"Withdrew \${amount}. Balance: \${self.balance}")

account = BankAccount("John", 1000)
account.deposit(500)
account.withdraw(200)
account.withdraw(2000)
print(f"Final balance: \${account.balance}")`
      },
      {
        id: 'm12l2', title: 'Inheritance',
        content: `
          <h2>Inheritance</h2>
          <p>A child class inherits attributes and methods from a parent class.</p>
          ${cb(`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

    def __str__(self):
        return f"Animal: {self.name}"

class Dog(Animal):
    def speak(self):                       # override
        print(f"{self.name} says Woof!")

class Cat(Animal):
    def speak(self):                       # override
        print(f"{self.name} says Meow!")

animals = [Dog("Rex"), Cat("Whiskers"), Dog("Buddy")]
for a in animals:
    a.speak()`)}
          <h2>super()</h2>
          ${cb(`class Vehicle:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def describe(self):
        return f"{self.year} {self.make} {self.model}"

class ElectricCar(Vehicle):
    def __init__(self, make, model, year, range_miles):
        super().__init__(make, model, year)  # call parent __init__
        self.range_miles = range_miles

    def describe(self):
        base = super().describe()           # call parent method
        return f"{base} (EV, {self.range_miles}mi range)"

car = ElectricCar("Tesla", "Model 3", 2024, 358)
print(car.describe())`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>class Child(Parent):</code> — Child inherits from Parent</li>
            <li>Override methods by redefining them in the child class</li>
            <li><code>super()</code> calls the parent class's method</li>
            <li><code>isinstance(obj, ClassName)</code> checks the inheritance chain</li>
          </ul></div>`,
        tryCode: `class Shape:
    def area(self):
        return 0

    def describe(self):
        print(f"{self.__class__.__name__}: area = {self.area():.2f}")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h

shapes = [Circle(5), Rectangle(4, 6), Circle(3)]
for s in shapes:
    s.describe()`
      },
      {
        id: 'm12l3', title: 'Special (Dunder) Methods',
        content: `
          <h2>Magic / Dunder Methods</h2>
          <p>Methods with double underscores — Python calls them automatically in response to operators and built-in functions.</p>
          ${cb(`class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):          # str(v), print(v)
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):         # repr(v), debugging
        return f"Vector(x={self.x}, y={self.y})"

    def __add__(self, other):   # v1 + v2
        return Vector(self.x + other.x, self.y + other.y)

    def __len__(self):          # len(v)
        return 2

    def __eq__(self, other):    # v1 == v2
        return self.x == other.x and self.y == other.y

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2

print(v1)
print(v3)
print(len(v1))
print(v1 == Vector(1, 2))`)}
          <h2>Common Dunder Methods</h2>
          <table>
            <tr><th>Method</th><th>Triggered by</th></tr>
            <tr><td><code>__str__</code></td><td><code>print(obj)</code>, <code>str(obj)</code></td></tr>
            <tr><td><code>__repr__</code></td><td>REPL display, debugging</td></tr>
            <tr><td><code>__len__</code></td><td><code>len(obj)</code></td></tr>
            <tr><td><code>__getitem__</code></td><td><code>obj[key]</code></td></tr>
            <tr><td><code>__add__</code></td><td><code>obj + other</code></td></tr>
            <tr><td><code>__eq__</code></td><td><code>obj == other</code></td></tr>
            <tr><td><code>__lt__</code></td><td><code>obj &lt; other</code></td></tr>
            <tr><td><code>__contains__</code></td><td><code>x in obj</code></td></tr>
            <tr><td><code>__iter__</code></td><td><code>for x in obj</code></td></tr>
          </table>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Always implement <code>__repr__</code> — it's the fallback for <code>__str__</code></li>
            <li>Dunder methods make custom classes work with Python's built-in syntax</li>
          </ul></div>`,
        tryCode: `class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []

    def add(self, song):
        self.songs.append(song)

    def __len__(self):
        return len(self.songs)

    def __str__(self):
        return f"Playlist '{self.name}' ({len(self)} songs)"

    def __contains__(self, song):
        return song in self.songs

p = Playlist("Favorites")
p.add("Bohemian Rhapsody")
p.add("Hotel California")
p.add("Stairway to Heaven")

print(p)
print(len(p))
print("Hotel California" in p)
print("Shape of You" in p)`
      },
      {
        id: 'm12l4', title: 'Class & Static Methods',
        content: `
          <h2>Instance Methods (default)</h2>
          <p>Operate on instance data. First arg is <code>self</code>.</p>
          <h2>Class Methods</h2>
          <p>Operate on the class itself. Decorated with <code>@classmethod</code>, first arg is <code>cls</code>. Often used as alternative constructors.</p>
          <h2>Static Methods</h2>
          <p>Don't take <code>self</code> or <code>cls</code>. Just a regular function namespaced inside the class.</p>
          ${cb(`class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    def __str__(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

    @classmethod
    def from_string(cls, date_str):      # alternative constructor
        y, m, d = map(int, date_str.split("-"))
        return cls(y, m, d)

    @staticmethod
    def is_leap(year):                   # utility — no self needed
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

d1 = Date(2024, 5, 15)
d2 = Date.from_string("2026-01-01")
print(d1, d2)
print(Date.is_leap(2024))
print(Date.is_leap(2025))`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>@classmethod</code> — takes <code>cls</code>, used for factory/alternative constructors</li>
            <li><code>@staticmethod</code> — no <code>self</code>/<code>cls</code>, just a grouped utility function</li>
            <li>Class methods are inherited and can be called on subclasses too</li>
          </ul></div>`,
        tryCode: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @classmethod
    def from_fahrenheit(cls, f):
        return cls((f - 32) * 5 / 9)

    @staticmethod
    def f_to_c(f):
        return (f - 32) * 5 / 9

    def __str__(self):
        return f"{self.celsius:.1f}°C / {self.celsius * 9/5 + 32:.1f}°F"

t1 = Temperature(100)
t2 = Temperature.from_fahrenheit(72)
print(t1)
print(t2)
print(Temperature.f_to_c(98.6))`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 13: Modules & Packages
  // ─────────────────────────────────────────────
  {
    id: 'm13', title: 'Modules & Packages', icon: '📚',
    description: 'Organize code with imports and the standard library.',
    lessons: [
      {
        id: 'm13l1', title: 'Imports',
        content: `
          <h2>import</h2>
          ${cb(`import math
print(math.pi)          # 3.14159...
print(math.sqrt(16))    # 4.0
print(math.floor(3.7))  # 3
print(math.ceil(3.2))   # 4`)}
          <h2>from ... import</h2>
          ${cb(`from math import pi, sqrt, factorial
print(pi)
print(sqrt(25))
print(factorial(5))

# Import with alias
import math as m
print(m.pow(2, 10))

from math import sqrt as sq
print(sq(81))`)}
          <h2>Your Own Modules</h2>
          <p>Any <code>.py</code> file is a module. Import it by filename (without <code>.py</code>).</p>
          ${cb(`# utils.py
# def double(x):
#     return x * 2

# main.py
# import utils
# print(utils.double(5))  # 10

# or:
# from utils import double
# print(double(5))

print("Module system works the same for your own files")`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>import module</code> → use <code>module.function()</code></li>
            <li><code>from module import name</code> → use <code>name()</code> directly</li>
            <li><code>import module as alias</code> → shorter reference</li>
            <li>Avoid <code>from module import *</code> — it pollutes the namespace</li>
          </ul></div>`,
        tryCode: `import math
import random

# Math operations
print("pi:", round(math.pi, 4))
print("sqrt(144):", math.sqrt(144))
print("log(100):", round(math.log10(100), 2))

# Random numbers
nums = [random.randint(1, 100) for _ in range(5)]
print("Random nums:", nums)
print("Max:", max(nums))
print("Min:", min(nums))`
      },
      {
        id: 'm13l2', title: 'Standard Library Highlights',
        content: `
          <h2>datetime</h2>
          ${cb(`from datetime import datetime, timedelta, date

now = datetime.now()
print(now)
print(now.year, now.month, now.day)
print(now.strftime("%Y-%m-%d %H:%M"))

# Arithmetic
next_week = now + timedelta(days=7)
print("Next week:", next_week.date())

birthday = date(1990, 6, 15)
today = date.today()
print("Age in days:", (today - birthday).days)`)}
          <h2>collections</h2>
          ${cb(`from collections import Counter, defaultdict, deque

# Counter — count occurrences
words = ["apple","banana","apple","cherry","banana","apple"]
c = Counter(words)
print(c)                      # Counter({'apple': 3, ...})
print(c.most_common(2))       # top 2

# defaultdict — auto-create missing keys
d = defaultdict(list)
d["fruits"].append("apple")
d["fruits"].append("banana")
d["vegs"].append("carrot")
print(dict(d))`)}
          <h2>os & pathlib</h2>
          ${cb(`import os
print(os.getcwd())              # current directory
print(os.path.join("dir", "file.txt"))

from pathlib import Path
p = Path(".")
print(p.resolve())
print(list(p.glob("*.py"))[:3])  # list .py files`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Python ships with 200+ standard library modules — check the docs before installing packages</li>
            <li><code>datetime</code> for dates/times, <code>os</code>/<code>pathlib</code> for filesystem, <code>json</code> for data, <code>re</code> for regex</li>
            <li><code>collections.Counter</code> is great for frequency counting</li>
          </ul></div>`,
        tryCode: `from collections import Counter
import random

# Generate random data and analyze it
rolls = [random.randint(1, 6) for _ in range(60)]
freq = Counter(rolls)

print("Dice roll distribution (60 rolls):")
for face in range(1, 7):
    count = freq[face]
    bar = "#" * count
    print(f"  {face}: {bar} ({count})")

# String frequency
text = "the quick brown fox jumps over the lazy dog"
word_count = Counter(text.split())
print("\\nTop 3 words:", word_count.most_common(3))`
      },
      {
        id: 'm13l3', title: 'pip & Virtual Environments',
        content: `
          <h2>pip</h2>
          <p>Python's package installer. Downloads from PyPI (Python Package Index).</p>
          <div class="code-block"><div class="code-block-header"><span>terminal</span></div>
          <pre><code class="language-bash">pip install requests
pip install pandas numpy matplotlib
pip install --upgrade requests
pip uninstall requests
pip list
pip freeze > requirements.txt
pip install -r requirements.txt</code></pre></div>
          <h2>Virtual Environments</h2>
          <p>Isolated Python environments per project — each project gets its own packages.</p>
          <div class="code-block"><div class="code-block-header"><span>terminal</span></div>
          <pre><code class="language-bash"># Create
python3 -m venv .venv

# Activate (Mac/Linux)
source .venv/bin/activate

# Activate (Windows)
.venv\\Scripts\\activate

# Now install packages — only affects this project
pip install requests

# Deactivate
deactivate</code></pre></div>
          <h2>Popular Third-Party Packages</h2>
          <table>
            <tr><th>Package</th><th>Use</th></tr>
            <tr><td>requests</td><td>HTTP calls (APIs)</td></tr>
            <tr><td>pandas</td><td>Data analysis/DataFrames</td></tr>
            <tr><td>numpy</td><td>Numerical computing</td></tr>
            <tr><td>fastapi / flask</td><td>Web backends</td></tr>
            <tr><td>sqlalchemy</td><td>Database ORM</td></tr>
            <tr><td>pytest</td><td>Testing</td></tr>
            <tr><td>pydantic</td><td>Data validation</td></tr>
          </table>
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Always use a virtual environment per project — never install globally</li>
            <li>Commit <code>requirements.txt</code> so others can reproduce your environment</li>
            <li>Modern projects use <code>pyproject.toml</code> with tools like <code>poetry</code> or <code>uv</code></li>
          </ul></div>`,
        tryCode: `# Simulate what 'requests' style code looks like
# (requests isn't available in browser runner, but here's the pattern)

import json

def fake_api_response():
    return json.dumps({
        "status": 200,
        "data": {
            "user": "John",
            "cameras": 12,
            "online": 10,
            "offline": 2
        }
    })

response_text = fake_api_response()
data = json.loads(response_text)

print(f"User: {data['data']['user']}")
print(f"Online cameras: {data['data']['online']}/{data['data']['cameras']}")`
      }
    ]
  },

  // ─────────────────────────────────────────────
  // MODULE 14: Advanced Python
  // ─────────────────────────────────────────────
  {
    id: 'm14', title: 'Advanced Python', icon: '🔥',
    description: 'Decorators, generators, type hints, and more.',
    lessons: [
      {
        id: 'm14l1', title: 'Decorators',
        content: `
          <h2>What is a Decorator?</h2>
          <p>A function that wraps another function to add behavior. The <code>@</code> syntax is sugar for <code>func = decorator(func)</code>.</p>
          ${cb(`def loud(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"Done.")
        return result
    return wrapper

@loud
def add(a, b):
    return a + b

print(add(3, 4))`)}
          <h2>Practical: Timing</h2>
          ${cb(`import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

print(slow_sum(1000000))`)}
          <h2>Decorators with Arguments</h2>
          ${cb(`def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Decorators are just functions that take and return functions</li>
            <li>Use <code>*args, **kwargs</code> in the wrapper to pass through all arguments</li>
            <li>Common uses: logging, timing, auth checks, caching, retry logic</li>
            <li><code>functools.wraps(func)</code> preserves the original function's metadata</li>
          </ul></div>`,
        tryCode: `def validate_positive(func):
    def wrapper(*args):
        for arg in args:
            if isinstance(arg, (int, float)) and arg < 0:
                raise ValueError(f"Negative value not allowed: {arg}")
        return func(*args)
    return wrapper

@validate_positive
def sqrt(n):
    return n ** 0.5

@validate_positive
def area(w, h):
    return w * h

print(sqrt(16))
print(area(5, 3))

try:
    sqrt(-4)
except ValueError as e:
    print(f"Error: {e}")`
      },
      {
        id: 'm14l2', title: 'Generators',
        content: `
          <h2>yield</h2>
          <p>A generator function uses <code>yield</code> instead of <code>return</code>. It produces values one at a time — lazily. Great for large sequences.</p>
          ${cb(`def count_up(start, end):
    current = start
    while current <= end:
        yield current
        current += 1

for n in count_up(1, 5):
    print(n)

# Use next() to get values manually
gen = count_up(10, 12)
print(next(gen))   # 10
print(next(gen))   # 11
print(next(gen))   # 12`)}
          <h2>Infinite Generators</h2>
          ${cb(`def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
print(first_10)`)}
          <h2>Generator Pipelines</h2>
          ${cb(`# Process data without loading everything into memory
def read_lines(text):
    for line in text.splitlines():
        yield line

def filter_empty(lines):
    for line in lines:
        if line.strip():
            yield line

def uppercase(lines):
    for line in lines:
        yield line.upper()

text = "  hello  \\n\\nworld\\n  \\npython"
pipeline = uppercase(filter_empty(read_lines(text)))
for line in pipeline:
    print(line)`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Generators are memory efficient — they don't build the whole sequence at once</li>
            <li><code>yield</code> pauses the function and returns a value; next call resumes</li>
            <li>Generators are one-pass — you can't rewind them</li>
            <li>Use generators for large files, streams, or infinite sequences</li>
          </ul></div>`,
        tryCode: `def squares(n):
    for i in range(1, n + 1):
        yield i ** 2

# Use it like any iterable
for sq in squares(8):
    print(sq, end=" ")
print()

# Sum without building a list
total = sum(squares(100))
print("Sum of squares 1-100:", total)

# Generator expression
even_squares = sum(x**2 for x in range(1, 11) if x % 2 == 0)
print("Sum of even squares 1-10:", even_squares)`
      },
      {
        id: 'm14l3', title: 'Context Managers',
        content: `
          <h2>with Statement</h2>
          <p>Context managers handle setup/teardown automatically. You've seen this with files — but you can write your own.</p>
          ${cb(`# File is the classic example
# with open("file.txt") as f:
#     data = f.read()
# File is automatically closed here — even if an exception occurs

# Timer context manager using a class
import time

class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, *args):
        self.elapsed = time.time() - self.start
        print(f"Elapsed: {self.elapsed:.4f}s")

with Timer():
    total = sum(range(1000000))
    print("Sum:", total)`)}
          <h2>contextlib.contextmanager</h2>
          <p>Easier way to write a context manager using a generator.</p>
          ${cb(`from contextlib import contextmanager

@contextmanager
def managed_resource(name):
    print(f"Acquiring {name}")
    try:
        yield name.upper()          # value bound to 'as' target
    finally:
        print(f"Releasing {name}")  # always runs

with managed_resource("database") as res:
    print(f"Using: {res}")
    # try uncommenting: raise RuntimeError("oops")
print("After with block")`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li><code>__enter__</code> runs at the start of <code>with</code>; <code>__exit__</code> runs at the end</li>
            <li><code>__exit__</code> runs even if an exception is raised</li>
            <li><code>@contextmanager</code> + generator is the easiest way to write one</li>
            <li>Common uses: files, DB connections, locks, timers, temporary state</li>
          </ul></div>`,
        tryCode: `from contextlib import contextmanager

@contextmanager
def indent(level=1):
    prefix = "  " * level
    print(f"{prefix}--- enter ---")
    yield prefix
    print(f"{prefix}--- exit ---")

with indent(1) as p:
    print(f"{p}Doing work at level 1")
    with indent(2) as p2:
        print(f"{p2}Nested work at level 2")
    print(f"{p}Back to level 1")`
      },
      {
        id: 'm14l4', title: 'Type Hints',
        content: `
          <h2>Type Hints</h2>
          <p>Python 3.5+ supports type annotations. They don't affect runtime but help editors, linters, and other developers understand your code.</p>
          ${cb(`def greet(name: str) -> str:
    return f"Hello, {name}"

def add(a: int, b: int) -> int:
    return a + b

def get_items() -> list:
    return [1, 2, 3]

print(greet("Alice"))
print(add(3, 4))`)}
          <h2>from typing (older style)</h2>
          ${cb(`from typing import List, Dict, Optional, Tuple, Union

def process_names(names: List[str]) -> Dict[str, int]:
    return {name: len(name) for name in names}

def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)  # returns str or None

print(process_names(["Alice", "Bob"]))
print(find_user(1))
print(find_user(99))`)}
          <h2>Modern Syntax (Python 3.10+)</h2>
          ${cb(`# Use built-in types directly — no need to import from typing
def get_names() -> list[str]:
    return ["Alice", "Bob"]

def lookup(key: str) -> str | None:   # Union with |
    data = {"a": "apple"}
    return data.get(key)

print(get_names())
print(lookup("a"))
print(lookup("z"))`)}
          <div class="key-points"><h4>Key Points</h4><ul>
            <li>Type hints are optional and not enforced at runtime</li>
            <li>Use <code>mypy</code> or <code>pyright</code> to statically check types</li>
            <li>Python 3.10+ syntax: <code>int | None</code> instead of <code>Optional[int]</code></li>
            <li>Type hints dramatically improve code readability and IDE support</li>
          </ul></div>`,
        tryCode: `from typing import Optional

def divide(a: float, b: float) -> Optional[float]:
    if b == 0:
        return None
    return a / b

def summarize(numbers: list) -> dict:
    return {
        "count": len(numbers),
        "sum": sum(numbers),
        "min": min(numbers),
        "max": max(numbers),
        "avg": sum(numbers) / len(numbers),
    }

result = divide(10, 3)
print(f"10 / 3 = {result:.4f}" if result else "Division error")

stats = summarize([4, 7, 2, 9, 1, 5, 8, 3])
for k, v in stats.items():
    print(f"  {k}: {v}")`
      },
      {
        id: 'm14l5', title: 'What to Learn Next',
        content: `
          <h2>You've covered the core language!</h2>
          <p>At this point you know enough Python to build real things. Here's where to go depending on what you want to do:</p>
          <h2>Web Development</h2>
          <ul>
            <li><strong>FastAPI</strong> — modern, fast, type-annotated web APIs</li>
            <li><strong>Django</strong> — full-featured web framework (ORM, admin, auth)</li>
            <li><strong>Flask</strong> — lightweight micro-framework</li>
          </ul>
          <h2>Data Science / ML</h2>
          <ul>
            <li><strong>pandas</strong> — data manipulation and analysis</li>
            <li><strong>numpy</strong> — numerical computing</li>
            <li><strong>matplotlib / seaborn</strong> — visualization</li>
            <li><strong>scikit-learn</strong> — machine learning</li>
            <li><strong>PyTorch / TensorFlow</strong> — deep learning</li>
          </ul>
          <h2>Automation & Scripting</h2>
          <ul>
            <li><strong>requests</strong> — HTTP / REST APIs</li>
            <li><strong>selenium / playwright</strong> — browser automation</li>
            <li><strong>paramiko</strong> — SSH automation</li>
            <li><strong>schedule</strong> — job scheduling</li>
          </ul>
          <h2>Going Deeper on Python Itself</h2>
          <ul>
            <li><strong>asyncio</strong> — async/await concurrency</li>
            <li><strong>dataclasses</strong> — auto-generate class boilerplate</li>
            <li><strong>Protocols & ABCs</strong> — structural typing</li>
            <li><strong>metaclasses</strong> — customizing class creation</li>
            <li><strong>C extensions</strong> — write Python modules in C</li>
          </ul>
          <div class="tip"><strong>💡 Best way to learn next</strong> Pick a project that interests you and build it. Reading only gets you so far — the real learning happens when you're stuck on a problem and have to figure it out.</div>
          <div class="key-points"><h4>Resources</h4><ul>
            <li><strong>docs.python.org</strong> — official docs, always accurate</li>
            <li><strong>realpython.com</strong> — tutorials with depth</li>
            <li><strong>pypi.org</strong> — find packages for anything</li>
            <li><strong>github.com</strong> — read other people's code</li>
          </ul></div>`,
        tryCode: `# A mini project to tie everything together
# Simple contact book using classes, dicts, and loops

class ContactBook:
    def __init__(self):
        self.contacts: dict = {}

    def add(self, name: str, phone: str, email: str = "") -> None:
        self.contacts[name.lower()] = {
            "name": name,
            "phone": phone,
            "email": email,
        }

    def find(self, query: str):
        query = query.lower()
        results = [c for k, c in self.contacts.items() if query in k]
        return results

    def list_all(self) -> None:
        for c in sorted(self.contacts.values(), key=lambda x: x["name"]):
            email = f" | {c['email']}" if c["email"] else ""
            print(f"  {c['name']}: {c['phone']}{email}")

book = ContactBook()
book.add("Alice Smith", "404-555-0101", "alice@example.com")
book.add("Bob Johnson", "678-555-0102")
book.add("Carol Davis", "770-555-0103", "carol@example.com")
book.add("Alice Brown", "404-555-0104")

print("All contacts:")
book.list_all()

print("\\nSearch 'alice':")
for c in book.find("alice"):
    print(f"  {c['name']} — {c['phone']}")`
      }
    ]
  }
];
