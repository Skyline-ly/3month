import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { getSavedCustomer } from "../utils/cart";

const categoryMap = {
  women: ["dresses",  "shoes",  ],
  men: ["jackets", "pants", "shirts", "shoes"],
  kid: ["tshirts", "shorts", "shoes", "accessories"],
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGender, setMobileGender] = useState("");
  const [profileName, setProfileName] = useState("");

  const activeGender = (() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] === "products") return parts[1] || "";
    return "";
  })();
  const isProductPath = location.pathname.startsWith("/products");
  const isSpecialCollection = ["new-arrival", "on-trend"].includes(activeGender);
  const showGender = !isSpecialCollection && (hovered || (isProductPath ? activeGender : ""));

  useEffect(() => {
    const syncProfile = () => setProfileName(getSavedCustomer().name || "");
    syncProfile();
    window.addEventListener("customerUpdated", syncProfile);
    return () => window.removeEventListener("customerUpdated", syncProfile);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="top-row">
          <div className="left-row">
            <div className="logo" onClick={() => navigate("/")}>
              <img className="png" src="https://static.vecteezy.com/system/resources/previews/025/742/620/non_2x/clothing-and-fashion-logo-design-hanger-concept-creative-simple-fashion-shop-business-fashion-free-vector.jpg" alt="Logo" />
            </div>
          </div>
          <div className="center-row">
            <ul className="nav-links">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              

              <li
                className="dropdown"
                onMouseEnter={() => setHovered("men")}
                onMouseLeave={() => setHovered("")}
              >
                <NavLink to="/products/men">Men</NavLink>
              </li>

              <li
                className="dropdown"
                onMouseEnter={() => setHovered("women")}
                onMouseLeave={() => setHovered("")}
              >
                <NavLink to="/products/women">Women</NavLink>
              </li>

              <li
                className="dropdown"
                onMouseEnter={() => setHovered("kid")}
                onMouseLeave={() => setHovered("")}
              >
                <NavLink to="/products/kid">Kid</NavLink>
              </li>

             

              <li>
                <NavLink to="/cart">Cart</NavLink>
              </li>
            </ul>
          </div>

          <div className="right-row">
            <div className="profile-badge">
              {profileName ? ` ${profileName}` : "Profile"}
            </div>
            <button
              className={`hamburger ${mobileOpen ? "open" : ""}`}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
            >
              <span />
              <span />
              <span />
            </button>

            
          </div>
        </div>
      </nav>
      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} role="dialog" aria-modal={mobileOpen}>
        <div className="mobile-inner">
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">×</button>
          <nav className="mobile-links">
            <NavLink to="/" onClick={() => setMobileOpen(false)}>Home</NavLink>
            <div className="mobile-section">
              <button onClick={() => setMobileGender(mobileGender === "men" ? "" : "men")} className="mobile-section-title">Men</button>
              {mobileGender === "men" && (
                <div className="mobile-sublinks">
                  {categoryMap.men.map((c) => (
                    <NavLink key={c} to={`/products/men/${c}`} onClick={() => setMobileOpen(false)}>{c.replace("-", " ")}</NavLink>
                  ))}
                  <NavLink to="/products/men/new-arrival" onClick={() => setMobileOpen(false)}>New Arrival</NavLink>
                  <NavLink to="/products/men/on-trend" onClick={() => setMobileOpen(false)}>On Trend</NavLink>
                </div>
              )}
            </div>

            <div className="mobile-section">
              <button onClick={() => setMobileGender(mobileGender === "women" ? "" : "women")} className="mobile-section-title">Women</button>
              {mobileGender === "women" && (
                <div className="mobile-sublinks">
                  {categoryMap.women.map((c) => (
                    <NavLink key={c} to={`/products/women/${c}`} onClick={() => setMobileOpen(false)}>{c.replace("-", " ")}</NavLink>
                  ))}
                  <NavLink to="/products/women/new-arrival" onClick={() => setMobileOpen(false)}>New Arrival</NavLink>
                  <NavLink to="/products/women/on-trend" onClick={() => setMobileOpen(false)}>On Trend</NavLink>
                </div>
              )}
            </div>

            <div className="mobile-section">
              <button onClick={() => setMobileGender(mobileGender === "kid" ? "" : "kid")} className="mobile-section-title">Kid</button>
              {mobileGender === "kid" && (
                <div className="mobile-sublinks">
                  {categoryMap.kid.map((c) => (
                    <NavLink key={c} to={`/products/kid/${c}`} onClick={() => setMobileOpen(false)}>{c.replace("-", " ")}</NavLink>
                  ))}
                  <NavLink to="/products/kid/new-arrival" onClick={() => setMobileOpen(false)}>New Arrival</NavLink>
                  <NavLink to="/products/kid/on-trend" onClick={() => setMobileOpen(false)}>On Trend</NavLink>
                </div>
              )}
            </div>

            <NavLink to="/cart" onClick={() => setMobileOpen(false)}>Cart</NavLink>
          </nav>
        </div>
      </div>

      <div className={`subnav ${showGender ? "visible" : ""}`}>
        <div className="subnav-inner">
          <div className="subnav-left">
            <NavLink to={`/products/${showGender || "women"}`} className="subnav-all">
              {showGender ? `All ${showGender.charAt(0).toUpperCase() + showGender.slice(1)}` : "Explore"}
            </NavLink>
          </div>
          <div className="subnav-links">
            {showGender && (
              <>
                <NavLink to={`/products/${showGender}/new-arrival`} className="subnav-link">
                  New Arrival
                </NavLink>
                <NavLink to={`/products/${showGender}/on-trend`} className="subnav-link">
                  On Trend
                </NavLink>
              </>
            )}
            {(categoryMap[showGender] || []).map((c) => (
              <NavLink key={c} to={`/products/${showGender}/${c}`} className="subnav-link">
                {c.replace("-", " ")}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;