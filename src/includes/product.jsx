import React from "react";
import '../../src/css/user/userstyle.css';

const navDropdowns = [
  {
    title: "Lamps & Lighting",
    links: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" }
    ]
  },
  {
    title: "Kitchen & Dining",
    links: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" }
    ]
  },
  {
    title: "Luxury",
    links: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" }
    ]
  },
  {
    title: "Modular",
    links: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" }
    ]
  }
];

export default function NavDropdowns() {
  return (F
    <>
      {navDropdowns.map((item, idx) => (
        <div key={idx} className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            {item.title}
          </a>
          <div className="dropdown-menu border-0 rounded-0 rounded-bottom m-0">
            {item.links.map((link, linkIdx) => (
              <a key={linkIdx} href={link.href} className="dropdown-item">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}


// ### Changes Made Based on the Design:
// 1. **Layout and Spacing**:
//    - Ensured the image and details are side by side with proper padding and alignment using flexbox.
//    - Adjusted margins and padding to match the compact design (e.g., `margin: 5px 0` for text elements).

// 2. **Size and Quantity Controls**:
//    - Separated the size and quantity controls into distinct `size-control` and `qty-control` divs for better alignment.
//    - Reduced the padding and font size of the buttons and input to `3px` and `0.9rem` respectively, matching the smaller design.
//    - Set the input width to `40px` for a tighter fit.

// 3. **Price Styling**:
//    - Formatted the price as `₹24,05.00` with a smaller `MRP: ₹33,679.00` in muted gray, matching the design.

// 4. **Icons Section**:
//    - Used Bootstrap Icons (`bi-arrow-return-right` for return, `bi-truck` for delivery) with proper spacing (`margin-right: 5px`).
//    - Adjusted the font size to `0.9rem` and ensured the text aligns with the design.

// 5. **Actions Buttons**:
//    - Used Bootstrap Icons (`bi-cart` for "Move to cart", `bi-trash` for "Delete") with appropriate spacing.
//    - Styled the buttons with `border: 1px solid #dee2e6`, `border-radius: 5px`, and `font-size: 0.9rem` to match the design.

// 6. **Border Between Items**:
//    - Kept the `border-between` class to maintain the horizontal border between items (as defined in the parent CSS).

// ### Integration into the Full Code:
// You can replace the existing wishlist item blocks in your full HTML file with this updated code. Here’s how it fits into the structure (just showing the replacement section):

// ```html

