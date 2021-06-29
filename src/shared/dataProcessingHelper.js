/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)
 
 SPDX-License-identifier: GPL-2.0

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

import React from "react";

export const buildHierarchy = (data) => {
  let roots = [],
    children = {};

  // Find the top level nodes
  data.forEach((item) => {
    let p = item.parent;
    let target;
    target = !p ? roots : children[p] || (children[p] = []);
    target.push({ value: item });
  });

  // Recursively build the tree
  const findChildren = (parent) => {
    if (children[parent.value.id]) {
      parent.children = children[parent.value.id];
      parent.children.forEach((child) => {
        findChildren(child);
      });
    }
  };

  // Incase there are multiple roots
  roots.forEach((root) => {
    findChildren(root);
  });

  return roots;
};

export const generateHtml = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    return (
      <ul key={data.length} className="tree-view-ul">
        {data.map((item) => {
          if (!Array.isArray(item.children) || item.children.length == 0)
            return <li key={item.value.name}>{item.value.name}</li>;
          else {
            return (
              <>
                <input
                  type="checkbox"
                  id={item.value.name}
                  key={item.value.name}
                  className="tree-view-list"
                />
                <label htmlFor={item.value.name}>
                  <li key={item.value.name}>{item.value.name}</li>
                  {generateHtml(item.children)}
                </label>
              </>
            );
          }
        })}
      </ul>
    );
  }
  return;
};
