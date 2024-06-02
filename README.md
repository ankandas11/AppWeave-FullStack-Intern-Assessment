# AppWeave-FullStack-Intern-Assessment

Problems Faced and Navigations:
1. Dynamic rendering of list of products on search and queries and filters. Implemented 'rederedProducts' array to dynamically update DOM.
2. State Management in Cart. the concept of localStorage implemenation made that task managed.
3. Responsive Layout Issues. Learnt about Bootstrap and was able to implement it.
4. In Reusing the components. Flowchart made the requirements clear to achieve the desired results.

Start
  |
  v
Load Home Page
  |
  v
+---------------------------+
|       User Actions        |
|---------------------------|
| View Products             |
| Search/Filter Products    |
+---------------------------+
  |
  v
Add to Cart
  |
  v
Check Cart
  |
  +----------------------------+
  |                            |
  v                            v
Item Exists in Cart       Item Does Not Exist in Cart
  |                            |
  v                            v
Exceeds Stock?                Add Item to Cart
  |                            |
+----+                         |
|    |                         |
v    v                         v
Alert: Max Qty Reached    Add Item with Qty 1
  |                            |
  v                            v
No                     Update Cart in localStorage
  |                            |
  v                            v
Increment Quantity      Update Cart Display
  |
  v
Update Cart in localStorage
  |
  v
Update Cart Display
  |
  v
+---------------------------+
|       View Cart           |
+---------------------------+
  |
  v
+---------------------------+
|       Manage Cart         |
|---------------------------|
| Increment/Decrement Qty   |
| Remove Item               |
+---------------------------+
  |
  v
Update Cart in localStorage
  |
  v
Update Cart Display
  |
  v
Checkout
  |
  v
End

5. I was not *very* proficient with CSS and thus faced problems in cards coloring thus I tried to keep a minimalistic design instead of coloring every button/card.
