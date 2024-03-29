INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Hello', 1, 'Write a function "hello" that returns the string "Hello"', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestHello(unittest.TestCase):

  def test_hello(self):
    self.assertEqual(hello(), "Hello", "Function should return \"Hello\"")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Hello world', 2, 'Write a function "hello" that returns the string "Hello world!"', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestHello(unittest.TestCase):

  def test_hello(self):
    self.assertEqual(hello(), "Hello world!", "Function should return \"Hello world!\"")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Sum', 3, 'Write a function "sum" that takes two numbers as parameters and returns their sum.', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestHello(unittest.TestCase):

  def test_sum_1(self):
    self.assertEqual(sum(2, 4), 6, "Call sum(2, 4) should return 6.")

  def test_sum_2(self):
    self.assertEqual(sum(40, 2), 42, "Call sum(40, 2) should return 42.")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Square', 4, 'Write a function "square" that takes a number as a parameter and returns its square.', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestSquare(unittest.TestCase):

  def test_square_1(self):
    self.assertEqual(square(3), 9, "Call square(3) should return 9.")

  def test_square_2(self):
    self.assertEqual(square(-5), 25, "Call square(-5) should return 25.")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Product', 5, 'Write a function "product" that takes two numbers as parameters and returns their product.', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestProduct(unittest.TestCase):

  def test_product_1(self):
    self.assertEqual(product(3, 4), 12, "Call product(3, 4) should return 12.")

  def test_product_2(self):
    self.assertEqual(product(0, 7), 0, "Call product(0, 7) should return 0.")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Power', 6, 'Write a function "power" that takes two numbers as parameters and returns the first number raised to the power of the second number.', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestPower(unittest.TestCase):

  def test_power_1(self):
    self.assertEqual(power(2, 3), 8, "Call power(2, 3) should return 8.")

  def test_power_2(self):
    self.assertEqual(power(5, 0), 1, "Call power(5, 0) should return 1.")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Divide', 7, 'Write a function "divide" that takes two numbers as parameters and returns the result of dividing the first number by the second number.', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestDivide(unittest.TestCase):

  def test_divide_1(self):
    self.assertEqual(divide(10, 2), 5, "Call divide(10, 2) should return 5.")

  def test_divide_2(self):
    self.assertEqual(divide(15, 3), 5, "Call divide(15, 3) should return 5.")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Factorial', 8, 'Write a function "factorial" that takes a number as a parameter and returns its factorial.', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestFactorial(unittest.TestCase):

  def test_factorial_1(self):
    self.assertEqual(factorial(4), 24, "Call factorial(4) should return 24.")

  def test_factorial_2(self):
    self.assertEqual(factorial(0), 1, "Call factorial(0) should return 1.")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Is Even', 9, 'Write a function "is_even" that takes a number as a parameter and returns True if the number is even, otherwise False.', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestIsEven(unittest.TestCase):

  def test_is_even_1(self):
    self.assertEqual(is_even(6), True, "Call is_even(6) should return True.")

  def test_is_even_2(self):
    self.assertEqual(is_even(11), False, "Call is_even(11) should return False.")
');

INSERT INTO programming_assignments (title, assignment_order, handout, test_code) VALUES ('Reverse String', 10, 'Write a function "reverse_string" that takes a string as a parameter and returns its reverse.', 'import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestReverseString(unittest.TestCase):

  def test_reverse_string_1(self):
    self.assertEqual(reverse_string("hello"), "olleh", "Call reverse_string(\"hello\") should return \"olleh\".")

  def test_reverse_string_2(self):
    self.assertEqual(reverse_string("world"), "dlrow", "Call reverse_string(\"world\") should return \"dlrow\".")
');
