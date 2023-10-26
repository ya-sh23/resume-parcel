/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/postcss-value-parser";
exports.ids = ["vendor-chunks/postcss-value-parser"];
exports.modules = {

/***/ "(ssr)/./node_modules/postcss-value-parser/lib/parse.js":
/*!********************************************************!*\
  !*** ./node_modules/postcss-value-parser/lib/parse.js ***!
  \********************************************************/
/***/ ((module) => {

eval("var openParentheses = \"(\".charCodeAt(0);\nvar closeParentheses = \")\".charCodeAt(0);\nvar singleQuote = \"'\".charCodeAt(0);\nvar doubleQuote = '\"'.charCodeAt(0);\nvar backslash = \"\\\\\".charCodeAt(0);\nvar slash = \"/\".charCodeAt(0);\nvar comma = \",\".charCodeAt(0);\nvar colon = \":\".charCodeAt(0);\nvar star = \"*\".charCodeAt(0);\nvar uLower = \"u\".charCodeAt(0);\nvar uUpper = \"U\".charCodeAt(0);\nvar plus = \"+\".charCodeAt(0);\nvar isUnicodeRange = /^[a-f0-9?-]+$/i;\n\nmodule.exports = function(input) {\n  var tokens = [];\n  var value = input;\n\n  var next,\n    quote,\n    prev,\n    token,\n    escape,\n    escapePos,\n    whitespacePos,\n    parenthesesOpenPos;\n  var pos = 0;\n  var code = value.charCodeAt(pos);\n  var max = value.length;\n  var stack = [{ nodes: tokens }];\n  var balanced = 0;\n  var parent;\n\n  var name = \"\";\n  var before = \"\";\n  var after = \"\";\n\n  while (pos < max) {\n    // Whitespaces\n    if (code <= 32) {\n      next = pos;\n      do {\n        next += 1;\n        code = value.charCodeAt(next);\n      } while (code <= 32);\n      token = value.slice(pos, next);\n\n      prev = tokens[tokens.length - 1];\n      if (code === closeParentheses && balanced) {\n        after = token;\n      } else if (prev && prev.type === \"div\") {\n        prev.after = token;\n        prev.sourceEndIndex += token.length;\n      } else if (\n        code === comma ||\n        code === colon ||\n        (code === slash &&\n          value.charCodeAt(next + 1) !== star &&\n          (!parent ||\n            (parent && parent.type === \"function\" && parent.value !== \"calc\")))\n      ) {\n        before = token;\n      } else {\n        tokens.push({\n          type: \"space\",\n          sourceIndex: pos,\n          sourceEndIndex: next,\n          value: token\n        });\n      }\n\n      pos = next;\n\n      // Quotes\n    } else if (code === singleQuote || code === doubleQuote) {\n      next = pos;\n      quote = code === singleQuote ? \"'\" : '\"';\n      token = {\n        type: \"string\",\n        sourceIndex: pos,\n        quote: quote\n      };\n      do {\n        escape = false;\n        next = value.indexOf(quote, next + 1);\n        if (~next) {\n          escapePos = next;\n          while (value.charCodeAt(escapePos - 1) === backslash) {\n            escapePos -= 1;\n            escape = !escape;\n          }\n        } else {\n          value += quote;\n          next = value.length - 1;\n          token.unclosed = true;\n        }\n      } while (escape);\n      token.value = value.slice(pos + 1, next);\n      token.sourceEndIndex = token.unclosed ? next : next + 1;\n      tokens.push(token);\n      pos = next + 1;\n      code = value.charCodeAt(pos);\n\n      // Comments\n    } else if (code === slash && value.charCodeAt(pos + 1) === star) {\n      next = value.indexOf(\"*/\", pos);\n\n      token = {\n        type: \"comment\",\n        sourceIndex: pos,\n        sourceEndIndex: next + 2\n      };\n\n      if (next === -1) {\n        token.unclosed = true;\n        next = value.length;\n        token.sourceEndIndex = next;\n      }\n\n      token.value = value.slice(pos + 2, next);\n      tokens.push(token);\n\n      pos = next + 2;\n      code = value.charCodeAt(pos);\n\n      // Operation within calc\n    } else if (\n      (code === slash || code === star) &&\n      parent &&\n      parent.type === \"function\" &&\n      parent.value === \"calc\"\n    ) {\n      token = value[pos];\n      tokens.push({\n        type: \"word\",\n        sourceIndex: pos - before.length,\n        sourceEndIndex: pos + token.length,\n        value: token\n      });\n      pos += 1;\n      code = value.charCodeAt(pos);\n\n      // Dividers\n    } else if (code === slash || code === comma || code === colon) {\n      token = value[pos];\n\n      tokens.push({\n        type: \"div\",\n        sourceIndex: pos - before.length,\n        sourceEndIndex: pos + token.length,\n        value: token,\n        before: before,\n        after: \"\"\n      });\n      before = \"\";\n\n      pos += 1;\n      code = value.charCodeAt(pos);\n\n      // Open parentheses\n    } else if (openParentheses === code) {\n      // Whitespaces after open parentheses\n      next = pos;\n      do {\n        next += 1;\n        code = value.charCodeAt(next);\n      } while (code <= 32);\n      parenthesesOpenPos = pos;\n      token = {\n        type: \"function\",\n        sourceIndex: pos - name.length,\n        value: name,\n        before: value.slice(parenthesesOpenPos + 1, next)\n      };\n      pos = next;\n\n      if (name === \"url\" && code !== singleQuote && code !== doubleQuote) {\n        next -= 1;\n        do {\n          escape = false;\n          next = value.indexOf(\")\", next + 1);\n          if (~next) {\n            escapePos = next;\n            while (value.charCodeAt(escapePos - 1) === backslash) {\n              escapePos -= 1;\n              escape = !escape;\n            }\n          } else {\n            value += \")\";\n            next = value.length - 1;\n            token.unclosed = true;\n          }\n        } while (escape);\n        // Whitespaces before closed\n        whitespacePos = next;\n        do {\n          whitespacePos -= 1;\n          code = value.charCodeAt(whitespacePos);\n        } while (code <= 32);\n        if (parenthesesOpenPos < whitespacePos) {\n          if (pos !== whitespacePos + 1) {\n            token.nodes = [\n              {\n                type: \"word\",\n                sourceIndex: pos,\n                sourceEndIndex: whitespacePos + 1,\n                value: value.slice(pos, whitespacePos + 1)\n              }\n            ];\n          } else {\n            token.nodes = [];\n          }\n          if (token.unclosed && whitespacePos + 1 !== next) {\n            token.after = \"\";\n            token.nodes.push({\n              type: \"space\",\n              sourceIndex: whitespacePos + 1,\n              sourceEndIndex: next,\n              value: value.slice(whitespacePos + 1, next)\n            });\n          } else {\n            token.after = value.slice(whitespacePos + 1, next);\n            token.sourceEndIndex = next;\n          }\n        } else {\n          token.after = \"\";\n          token.nodes = [];\n        }\n        pos = next + 1;\n        token.sourceEndIndex = token.unclosed ? next : pos;\n        code = value.charCodeAt(pos);\n        tokens.push(token);\n      } else {\n        balanced += 1;\n        token.after = \"\";\n        token.sourceEndIndex = pos + 1;\n        tokens.push(token);\n        stack.push(token);\n        tokens = token.nodes = [];\n        parent = token;\n      }\n      name = \"\";\n\n      // Close parentheses\n    } else if (closeParentheses === code && balanced) {\n      pos += 1;\n      code = value.charCodeAt(pos);\n\n      parent.after = after;\n      parent.sourceEndIndex += after.length;\n      after = \"\";\n      balanced -= 1;\n      stack[stack.length - 1].sourceEndIndex = pos;\n      stack.pop();\n      parent = stack[balanced];\n      tokens = parent.nodes;\n\n      // Words\n    } else {\n      next = pos;\n      do {\n        if (code === backslash) {\n          next += 1;\n        }\n        next += 1;\n        code = value.charCodeAt(next);\n      } while (\n        next < max &&\n        !(\n          code <= 32 ||\n          code === singleQuote ||\n          code === doubleQuote ||\n          code === comma ||\n          code === colon ||\n          code === slash ||\n          code === openParentheses ||\n          (code === star &&\n            parent &&\n            parent.type === \"function\" &&\n            parent.value === \"calc\") ||\n          (code === slash &&\n            parent.type === \"function\" &&\n            parent.value === \"calc\") ||\n          (code === closeParentheses && balanced)\n        )\n      );\n      token = value.slice(pos, next);\n\n      if (openParentheses === code) {\n        name = token;\n      } else if (\n        (uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) &&\n        plus === token.charCodeAt(1) &&\n        isUnicodeRange.test(token.slice(2))\n      ) {\n        tokens.push({\n          type: \"unicode-range\",\n          sourceIndex: pos,\n          sourceEndIndex: next,\n          value: token\n        });\n      } else {\n        tokens.push({\n          type: \"word\",\n          sourceIndex: pos,\n          sourceEndIndex: next,\n          value: token\n        });\n      }\n\n      pos = next;\n    }\n  }\n\n  for (pos = stack.length - 1; pos; pos -= 1) {\n    stack[pos].unclosed = true;\n    stack[pos].sourceEndIndex = value.length;\n  }\n\n  return stack[0].nodes;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcG9zdGNzcy12YWx1ZS1wYXJzZXIvbGliL3BhcnNlLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGVBQWU7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuLXJlc3VtZS8uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLXZhbHVlLXBhcnNlci9saWIvcGFyc2UuanM/NWQ2ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgb3BlblBhcmVudGhlc2VzID0gXCIoXCIuY2hhckNvZGVBdCgwKTtcbnZhciBjbG9zZVBhcmVudGhlc2VzID0gXCIpXCIuY2hhckNvZGVBdCgwKTtcbnZhciBzaW5nbGVRdW90ZSA9IFwiJ1wiLmNoYXJDb2RlQXQoMCk7XG52YXIgZG91YmxlUXVvdGUgPSAnXCInLmNoYXJDb2RlQXQoMCk7XG52YXIgYmFja3NsYXNoID0gXCJcXFxcXCIuY2hhckNvZGVBdCgwKTtcbnZhciBzbGFzaCA9IFwiL1wiLmNoYXJDb2RlQXQoMCk7XG52YXIgY29tbWEgPSBcIixcIi5jaGFyQ29kZUF0KDApO1xudmFyIGNvbG9uID0gXCI6XCIuY2hhckNvZGVBdCgwKTtcbnZhciBzdGFyID0gXCIqXCIuY2hhckNvZGVBdCgwKTtcbnZhciB1TG93ZXIgPSBcInVcIi5jaGFyQ29kZUF0KDApO1xudmFyIHVVcHBlciA9IFwiVVwiLmNoYXJDb2RlQXQoMCk7XG52YXIgcGx1cyA9IFwiK1wiLmNoYXJDb2RlQXQoMCk7XG52YXIgaXNVbmljb2RlUmFuZ2UgPSAvXlthLWYwLTk/LV0rJC9pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHZhciB0b2tlbnMgPSBbXTtcbiAgdmFyIHZhbHVlID0gaW5wdXQ7XG5cbiAgdmFyIG5leHQsXG4gICAgcXVvdGUsXG4gICAgcHJldixcbiAgICB0b2tlbixcbiAgICBlc2NhcGUsXG4gICAgZXNjYXBlUG9zLFxuICAgIHdoaXRlc3BhY2VQb3MsXG4gICAgcGFyZW50aGVzZXNPcGVuUG9zO1xuICB2YXIgcG9zID0gMDtcbiAgdmFyIGNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KHBvcyk7XG4gIHZhciBtYXggPSB2YWx1ZS5sZW5ndGg7XG4gIHZhciBzdGFjayA9IFt7IG5vZGVzOiB0b2tlbnMgfV07XG4gIHZhciBiYWxhbmNlZCA9IDA7XG4gIHZhciBwYXJlbnQ7XG5cbiAgdmFyIG5hbWUgPSBcIlwiO1xuICB2YXIgYmVmb3JlID0gXCJcIjtcbiAgdmFyIGFmdGVyID0gXCJcIjtcblxuICB3aGlsZSAocG9zIDwgbWF4KSB7XG4gICAgLy8gV2hpdGVzcGFjZXNcbiAgICBpZiAoY29kZSA8PSAzMikge1xuICAgICAgbmV4dCA9IHBvcztcbiAgICAgIGRvIHtcbiAgICAgICAgbmV4dCArPSAxO1xuICAgICAgICBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChuZXh0KTtcbiAgICAgIH0gd2hpbGUgKGNvZGUgPD0gMzIpO1xuICAgICAgdG9rZW4gPSB2YWx1ZS5zbGljZShwb3MsIG5leHQpO1xuXG4gICAgICBwcmV2ID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChjb2RlID09PSBjbG9zZVBhcmVudGhlc2VzICYmIGJhbGFuY2VkKSB7XG4gICAgICAgIGFmdGVyID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHByZXYgJiYgcHJldi50eXBlID09PSBcImRpdlwiKSB7XG4gICAgICAgIHByZXYuYWZ0ZXIgPSB0b2tlbjtcbiAgICAgICAgcHJldi5zb3VyY2VFbmRJbmRleCArPSB0b2tlbi5sZW5ndGg7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBjb2RlID09PSBjb21tYSB8fFxuICAgICAgICBjb2RlID09PSBjb2xvbiB8fFxuICAgICAgICAoY29kZSA9PT0gc2xhc2ggJiZcbiAgICAgICAgICB2YWx1ZS5jaGFyQ29kZUF0KG5leHQgKyAxKSAhPT0gc3RhciAmJlxuICAgICAgICAgICghcGFyZW50IHx8XG4gICAgICAgICAgICAocGFyZW50ICYmIHBhcmVudC50eXBlID09PSBcImZ1bmN0aW9uXCIgJiYgcGFyZW50LnZhbHVlICE9PSBcImNhbGNcIikpKVxuICAgICAgKSB7XG4gICAgICAgIGJlZm9yZSA9IHRva2VuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICBzb3VyY2VJbmRleDogcG9zLFxuICAgICAgICAgIHNvdXJjZUVuZEluZGV4OiBuZXh0LFxuICAgICAgICAgIHZhbHVlOiB0b2tlblxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcG9zID0gbmV4dDtcblxuICAgICAgLy8gUXVvdGVzXG4gICAgfSBlbHNlIGlmIChjb2RlID09PSBzaW5nbGVRdW90ZSB8fCBjb2RlID09PSBkb3VibGVRdW90ZSkge1xuICAgICAgbmV4dCA9IHBvcztcbiAgICAgIHF1b3RlID0gY29kZSA9PT0gc2luZ2xlUXVvdGUgPyBcIidcIiA6ICdcIic7XG4gICAgICB0b2tlbiA9IHtcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgc291cmNlSW5kZXg6IHBvcyxcbiAgICAgICAgcXVvdGU6IHF1b3RlXG4gICAgICB9O1xuICAgICAgZG8ge1xuICAgICAgICBlc2NhcGUgPSBmYWxzZTtcbiAgICAgICAgbmV4dCA9IHZhbHVlLmluZGV4T2YocXVvdGUsIG5leHQgKyAxKTtcbiAgICAgICAgaWYgKH5uZXh0KSB7XG4gICAgICAgICAgZXNjYXBlUG9zID0gbmV4dDtcbiAgICAgICAgICB3aGlsZSAodmFsdWUuY2hhckNvZGVBdChlc2NhcGVQb3MgLSAxKSA9PT0gYmFja3NsYXNoKSB7XG4gICAgICAgICAgICBlc2NhcGVQb3MgLT0gMTtcbiAgICAgICAgICAgIGVzY2FwZSA9ICFlc2NhcGU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlICs9IHF1b3RlO1xuICAgICAgICAgIG5leHQgPSB2YWx1ZS5sZW5ndGggLSAxO1xuICAgICAgICAgIHRva2VuLnVuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSB3aGlsZSAoZXNjYXBlKTtcbiAgICAgIHRva2VuLnZhbHVlID0gdmFsdWUuc2xpY2UocG9zICsgMSwgbmV4dCk7XG4gICAgICB0b2tlbi5zb3VyY2VFbmRJbmRleCA9IHRva2VuLnVuY2xvc2VkID8gbmV4dCA6IG5leHQgKyAxO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgcG9zID0gbmV4dCArIDE7XG4gICAgICBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChwb3MpO1xuXG4gICAgICAvLyBDb21tZW50c1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gc2xhc2ggJiYgdmFsdWUuY2hhckNvZGVBdChwb3MgKyAxKSA9PT0gc3Rhcikge1xuICAgICAgbmV4dCA9IHZhbHVlLmluZGV4T2YoXCIqL1wiLCBwb3MpO1xuXG4gICAgICB0b2tlbiA9IHtcbiAgICAgICAgdHlwZTogXCJjb21tZW50XCIsXG4gICAgICAgIHNvdXJjZUluZGV4OiBwb3MsXG4gICAgICAgIHNvdXJjZUVuZEluZGV4OiBuZXh0ICsgMlxuICAgICAgfTtcblxuICAgICAgaWYgKG5leHQgPT09IC0xKSB7XG4gICAgICAgIHRva2VuLnVuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgbmV4dCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgdG9rZW4uc291cmNlRW5kSW5kZXggPSBuZXh0O1xuICAgICAgfVxuXG4gICAgICB0b2tlbi52YWx1ZSA9IHZhbHVlLnNsaWNlKHBvcyArIDIsIG5leHQpO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICBwb3MgPSBuZXh0ICsgMjtcbiAgICAgIGNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KHBvcyk7XG5cbiAgICAgIC8vIE9wZXJhdGlvbiB3aXRoaW4gY2FsY1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAoY29kZSA9PT0gc2xhc2ggfHwgY29kZSA9PT0gc3RhcikgJiZcbiAgICAgIHBhcmVudCAmJlxuICAgICAgcGFyZW50LnR5cGUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgcGFyZW50LnZhbHVlID09PSBcImNhbGNcIlxuICAgICkge1xuICAgICAgdG9rZW4gPSB2YWx1ZVtwb3NdO1xuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiBcIndvcmRcIixcbiAgICAgICAgc291cmNlSW5kZXg6IHBvcyAtIGJlZm9yZS5sZW5ndGgsXG4gICAgICAgIHNvdXJjZUVuZEluZGV4OiBwb3MgKyB0b2tlbi5sZW5ndGgsXG4gICAgICAgIHZhbHVlOiB0b2tlblxuICAgICAgfSk7XG4gICAgICBwb3MgKz0gMTtcbiAgICAgIGNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KHBvcyk7XG5cbiAgICAgIC8vIERpdmlkZXJzXG4gICAgfSBlbHNlIGlmIChjb2RlID09PSBzbGFzaCB8fCBjb2RlID09PSBjb21tYSB8fCBjb2RlID09PSBjb2xvbikge1xuICAgICAgdG9rZW4gPSB2YWx1ZVtwb3NdO1xuXG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZGl2XCIsXG4gICAgICAgIHNvdXJjZUluZGV4OiBwb3MgLSBiZWZvcmUubGVuZ3RoLFxuICAgICAgICBzb3VyY2VFbmRJbmRleDogcG9zICsgdG9rZW4ubGVuZ3RoLFxuICAgICAgICB2YWx1ZTogdG9rZW4sXG4gICAgICAgIGJlZm9yZTogYmVmb3JlLFxuICAgICAgICBhZnRlcjogXCJcIlxuICAgICAgfSk7XG4gICAgICBiZWZvcmUgPSBcIlwiO1xuXG4gICAgICBwb3MgKz0gMTtcbiAgICAgIGNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KHBvcyk7XG5cbiAgICAgIC8vIE9wZW4gcGFyZW50aGVzZXNcbiAgICB9IGVsc2UgaWYgKG9wZW5QYXJlbnRoZXNlcyA9PT0gY29kZSkge1xuICAgICAgLy8gV2hpdGVzcGFjZXMgYWZ0ZXIgb3BlbiBwYXJlbnRoZXNlc1xuICAgICAgbmV4dCA9IHBvcztcbiAgICAgIGRvIHtcbiAgICAgICAgbmV4dCArPSAxO1xuICAgICAgICBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChuZXh0KTtcbiAgICAgIH0gd2hpbGUgKGNvZGUgPD0gMzIpO1xuICAgICAgcGFyZW50aGVzZXNPcGVuUG9zID0gcG9zO1xuICAgICAgdG9rZW4gPSB7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgc291cmNlSW5kZXg6IHBvcyAtIG5hbWUubGVuZ3RoLFxuICAgICAgICB2YWx1ZTogbmFtZSxcbiAgICAgICAgYmVmb3JlOiB2YWx1ZS5zbGljZShwYXJlbnRoZXNlc09wZW5Qb3MgKyAxLCBuZXh0KVxuICAgICAgfTtcbiAgICAgIHBvcyA9IG5leHQ7XG5cbiAgICAgIGlmIChuYW1lID09PSBcInVybFwiICYmIGNvZGUgIT09IHNpbmdsZVF1b3RlICYmIGNvZGUgIT09IGRvdWJsZVF1b3RlKSB7XG4gICAgICAgIG5leHQgLT0gMTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGVzY2FwZSA9IGZhbHNlO1xuICAgICAgICAgIG5leHQgPSB2YWx1ZS5pbmRleE9mKFwiKVwiLCBuZXh0ICsgMSk7XG4gICAgICAgICAgaWYgKH5uZXh0KSB7XG4gICAgICAgICAgICBlc2NhcGVQb3MgPSBuZXh0O1xuICAgICAgICAgICAgd2hpbGUgKHZhbHVlLmNoYXJDb2RlQXQoZXNjYXBlUG9zIC0gMSkgPT09IGJhY2tzbGFzaCkge1xuICAgICAgICAgICAgICBlc2NhcGVQb3MgLT0gMTtcbiAgICAgICAgICAgICAgZXNjYXBlID0gIWVzY2FwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgKz0gXCIpXCI7XG4gICAgICAgICAgICBuZXh0ID0gdmFsdWUubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHRva2VuLnVuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGVzY2FwZSk7XG4gICAgICAgIC8vIFdoaXRlc3BhY2VzIGJlZm9yZSBjbG9zZWRcbiAgICAgICAgd2hpdGVzcGFjZVBvcyA9IG5leHQ7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICB3aGl0ZXNwYWNlUG9zIC09IDE7XG4gICAgICAgICAgY29kZSA9IHZhbHVlLmNoYXJDb2RlQXQod2hpdGVzcGFjZVBvcyk7XG4gICAgICAgIH0gd2hpbGUgKGNvZGUgPD0gMzIpO1xuICAgICAgICBpZiAocGFyZW50aGVzZXNPcGVuUG9zIDwgd2hpdGVzcGFjZVBvcykge1xuICAgICAgICAgIGlmIChwb3MgIT09IHdoaXRlc3BhY2VQb3MgKyAxKSB7XG4gICAgICAgICAgICB0b2tlbi5ub2RlcyA9IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwid29yZFwiLFxuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4OiBwb3MsXG4gICAgICAgICAgICAgICAgc291cmNlRW5kSW5kZXg6IHdoaXRlc3BhY2VQb3MgKyAxLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZS5zbGljZShwb3MsIHdoaXRlc3BhY2VQb3MgKyAxKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2tlbi5ub2RlcyA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodG9rZW4udW5jbG9zZWQgJiYgd2hpdGVzcGFjZVBvcyArIDEgIT09IG5leHQpIHtcbiAgICAgICAgICAgIHRva2VuLmFmdGVyID0gXCJcIjtcbiAgICAgICAgICAgIHRva2VuLm5vZGVzLnB1c2goe1xuICAgICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICAgIHNvdXJjZUluZGV4OiB3aGl0ZXNwYWNlUG9zICsgMSxcbiAgICAgICAgICAgICAgc291cmNlRW5kSW5kZXg6IG5leHQsXG4gICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZS5zbGljZSh3aGl0ZXNwYWNlUG9zICsgMSwgbmV4dClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2tlbi5hZnRlciA9IHZhbHVlLnNsaWNlKHdoaXRlc3BhY2VQb3MgKyAxLCBuZXh0KTtcbiAgICAgICAgICAgIHRva2VuLnNvdXJjZUVuZEluZGV4ID0gbmV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW4uYWZ0ZXIgPSBcIlwiO1xuICAgICAgICAgIHRva2VuLm5vZGVzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcG9zID0gbmV4dCArIDE7XG4gICAgICAgIHRva2VuLnNvdXJjZUVuZEluZGV4ID0gdG9rZW4udW5jbG9zZWQgPyBuZXh0IDogcG9zO1xuICAgICAgICBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWxhbmNlZCArPSAxO1xuICAgICAgICB0b2tlbi5hZnRlciA9IFwiXCI7XG4gICAgICAgIHRva2VuLnNvdXJjZUVuZEluZGV4ID0gcG9zICsgMTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBzdGFjay5wdXNoKHRva2VuKTtcbiAgICAgICAgdG9rZW5zID0gdG9rZW4ubm9kZXMgPSBbXTtcbiAgICAgICAgcGFyZW50ID0gdG9rZW47XG4gICAgICB9XG4gICAgICBuYW1lID0gXCJcIjtcblxuICAgICAgLy8gQ2xvc2UgcGFyZW50aGVzZXNcbiAgICB9IGVsc2UgaWYgKGNsb3NlUGFyZW50aGVzZXMgPT09IGNvZGUgJiYgYmFsYW5jZWQpIHtcbiAgICAgIHBvcyArPSAxO1xuICAgICAgY29kZSA9IHZhbHVlLmNoYXJDb2RlQXQocG9zKTtcblxuICAgICAgcGFyZW50LmFmdGVyID0gYWZ0ZXI7XG4gICAgICBwYXJlbnQuc291cmNlRW5kSW5kZXggKz0gYWZ0ZXIubGVuZ3RoO1xuICAgICAgYWZ0ZXIgPSBcIlwiO1xuICAgICAgYmFsYW5jZWQgLT0gMTtcbiAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLnNvdXJjZUVuZEluZGV4ID0gcG9zO1xuICAgICAgc3RhY2sucG9wKCk7XG4gICAgICBwYXJlbnQgPSBzdGFja1tiYWxhbmNlZF07XG4gICAgICB0b2tlbnMgPSBwYXJlbnQubm9kZXM7XG5cbiAgICAgIC8vIFdvcmRzXG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHQgPSBwb3M7XG4gICAgICBkbyB7XG4gICAgICAgIGlmIChjb2RlID09PSBiYWNrc2xhc2gpIHtcbiAgICAgICAgICBuZXh0ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dCArPSAxO1xuICAgICAgICBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChuZXh0KTtcbiAgICAgIH0gd2hpbGUgKFxuICAgICAgICBuZXh0IDwgbWF4ICYmXG4gICAgICAgICEoXG4gICAgICAgICAgY29kZSA8PSAzMiB8fFxuICAgICAgICAgIGNvZGUgPT09IHNpbmdsZVF1b3RlIHx8XG4gICAgICAgICAgY29kZSA9PT0gZG91YmxlUXVvdGUgfHxcbiAgICAgICAgICBjb2RlID09PSBjb21tYSB8fFxuICAgICAgICAgIGNvZGUgPT09IGNvbG9uIHx8XG4gICAgICAgICAgY29kZSA9PT0gc2xhc2ggfHxcbiAgICAgICAgICBjb2RlID09PSBvcGVuUGFyZW50aGVzZXMgfHxcbiAgICAgICAgICAoY29kZSA9PT0gc3RhciAmJlxuICAgICAgICAgICAgcGFyZW50ICYmXG4gICAgICAgICAgICBwYXJlbnQudHlwZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICBwYXJlbnQudmFsdWUgPT09IFwiY2FsY1wiKSB8fFxuICAgICAgICAgIChjb2RlID09PSBzbGFzaCAmJlxuICAgICAgICAgICAgcGFyZW50LnR5cGUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgcGFyZW50LnZhbHVlID09PSBcImNhbGNcIikgfHxcbiAgICAgICAgICAoY29kZSA9PT0gY2xvc2VQYXJlbnRoZXNlcyAmJiBiYWxhbmNlZClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIHRva2VuID0gdmFsdWUuc2xpY2UocG9zLCBuZXh0KTtcblxuICAgICAgaWYgKG9wZW5QYXJlbnRoZXNlcyA9PT0gY29kZSkge1xuICAgICAgICBuYW1lID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodUxvd2VyID09PSB0b2tlbi5jaGFyQ29kZUF0KDApIHx8IHVVcHBlciA9PT0gdG9rZW4uY2hhckNvZGVBdCgwKSkgJiZcbiAgICAgICAgcGx1cyA9PT0gdG9rZW4uY2hhckNvZGVBdCgxKSAmJlxuICAgICAgICBpc1VuaWNvZGVSYW5nZS50ZXN0KHRva2VuLnNsaWNlKDIpKVxuICAgICAgKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBcInVuaWNvZGUtcmFuZ2VcIixcbiAgICAgICAgICBzb3VyY2VJbmRleDogcG9zLFxuICAgICAgICAgIHNvdXJjZUVuZEluZGV4OiBuZXh0LFxuICAgICAgICAgIHZhbHVlOiB0b2tlblxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBcIndvcmRcIixcbiAgICAgICAgICBzb3VyY2VJbmRleDogcG9zLFxuICAgICAgICAgIHNvdXJjZUVuZEluZGV4OiBuZXh0LFxuICAgICAgICAgIHZhbHVlOiB0b2tlblxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcG9zID0gbmV4dDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHBvcyA9IHN0YWNrLmxlbmd0aCAtIDE7IHBvczsgcG9zIC09IDEpIHtcbiAgICBzdGFja1twb3NdLnVuY2xvc2VkID0gdHJ1ZTtcbiAgICBzdGFja1twb3NdLnNvdXJjZUVuZEluZGV4ID0gdmFsdWUubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHN0YWNrWzBdLm5vZGVzO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/postcss-value-parser/lib/parse.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/postcss-value-parser/lib/unit.js":
/*!*******************************************************!*\
  !*** ./node_modules/postcss-value-parser/lib/unit.js ***!
  \*******************************************************/
/***/ ((module) => {

eval("var minus = \"-\".charCodeAt(0);\nvar plus = \"+\".charCodeAt(0);\nvar dot = \".\".charCodeAt(0);\nvar exp = \"e\".charCodeAt(0);\nvar EXP = \"E\".charCodeAt(0);\n\n// Check if three code points would start a number\n// https://www.w3.org/TR/css-syntax-3/#starts-with-a-number\nfunction likeNumber(value) {\n  var code = value.charCodeAt(0);\n  var nextCode;\n\n  if (code === plus || code === minus) {\n    nextCode = value.charCodeAt(1);\n\n    if (nextCode >= 48 && nextCode <= 57) {\n      return true;\n    }\n\n    var nextNextCode = value.charCodeAt(2);\n\n    if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) {\n      return true;\n    }\n\n    return false;\n  }\n\n  if (code === dot) {\n    nextCode = value.charCodeAt(1);\n\n    if (nextCode >= 48 && nextCode <= 57) {\n      return true;\n    }\n\n    return false;\n  }\n\n  if (code >= 48 && code <= 57) {\n    return true;\n  }\n\n  return false;\n}\n\n// Consume a number\n// https://www.w3.org/TR/css-syntax-3/#consume-number\nmodule.exports = function(value) {\n  var pos = 0;\n  var length = value.length;\n  var code;\n  var nextCode;\n  var nextNextCode;\n\n  if (length === 0 || !likeNumber(value)) {\n    return false;\n  }\n\n  code = value.charCodeAt(pos);\n\n  if (code === plus || code === minus) {\n    pos++;\n  }\n\n  while (pos < length) {\n    code = value.charCodeAt(pos);\n\n    if (code < 48 || code > 57) {\n      break;\n    }\n\n    pos += 1;\n  }\n\n  code = value.charCodeAt(pos);\n  nextCode = value.charCodeAt(pos + 1);\n\n  if (code === dot && nextCode >= 48 && nextCode <= 57) {\n    pos += 2;\n\n    while (pos < length) {\n      code = value.charCodeAt(pos);\n\n      if (code < 48 || code > 57) {\n        break;\n      }\n\n      pos += 1;\n    }\n  }\n\n  code = value.charCodeAt(pos);\n  nextCode = value.charCodeAt(pos + 1);\n  nextNextCode = value.charCodeAt(pos + 2);\n\n  if (\n    (code === exp || code === EXP) &&\n    ((nextCode >= 48 && nextCode <= 57) ||\n      ((nextCode === plus || nextCode === minus) &&\n        nextNextCode >= 48 &&\n        nextNextCode <= 57))\n  ) {\n    pos += nextCode === plus || nextCode === minus ? 3 : 2;\n\n    while (pos < length) {\n      code = value.charCodeAt(pos);\n\n      if (code < 48 || code > 57) {\n        break;\n      }\n\n      pos += 1;\n    }\n  }\n\n  return {\n    number: value.slice(0, pos),\n    unit: value.slice(pos)\n  };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcG9zdGNzcy12YWx1ZS1wYXJzZXIvbGliL3VuaXQuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW4tcmVzdW1lLy4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtdmFsdWUtcGFyc2VyL2xpYi91bml0LmpzPzkzNGEiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG1pbnVzID0gXCItXCIuY2hhckNvZGVBdCgwKTtcbnZhciBwbHVzID0gXCIrXCIuY2hhckNvZGVBdCgwKTtcbnZhciBkb3QgPSBcIi5cIi5jaGFyQ29kZUF0KDApO1xudmFyIGV4cCA9IFwiZVwiLmNoYXJDb2RlQXQoMCk7XG52YXIgRVhQID0gXCJFXCIuY2hhckNvZGVBdCgwKTtcblxuLy8gQ2hlY2sgaWYgdGhyZWUgY29kZSBwb2ludHMgd291bGQgc3RhcnQgYSBudW1iZXJcbi8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9jc3Mtc3ludGF4LTMvI3N0YXJ0cy13aXRoLWEtbnVtYmVyXG5mdW5jdGlvbiBsaWtlTnVtYmVyKHZhbHVlKSB7XG4gIHZhciBjb2RlID0gdmFsdWUuY2hhckNvZGVBdCgwKTtcbiAgdmFyIG5leHRDb2RlO1xuXG4gIGlmIChjb2RlID09PSBwbHVzIHx8IGNvZGUgPT09IG1pbnVzKSB7XG4gICAgbmV4dENvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KDEpO1xuXG4gICAgaWYgKG5leHRDb2RlID49IDQ4ICYmIG5leHRDb2RlIDw9IDU3KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgbmV4dE5leHRDb2RlID0gdmFsdWUuY2hhckNvZGVBdCgyKTtcblxuICAgIGlmIChuZXh0Q29kZSA9PT0gZG90ICYmIG5leHROZXh0Q29kZSA+PSA0OCAmJiBuZXh0TmV4dENvZGUgPD0gNTcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChjb2RlID09PSBkb3QpIHtcbiAgICBuZXh0Q29kZSA9IHZhbHVlLmNoYXJDb2RlQXQoMSk7XG5cbiAgICBpZiAobmV4dENvZGUgPj0gNDggJiYgbmV4dENvZGUgPD0gNTcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gQ29uc3VtZSBhIG51bWJlclxuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL2Nzcy1zeW50YXgtMy8jY29uc3VtZS1udW1iZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gIHZhciBjb2RlO1xuICB2YXIgbmV4dENvZGU7XG4gIHZhciBuZXh0TmV4dENvZGU7XG5cbiAgaWYgKGxlbmd0aCA9PT0gMCB8fCAhbGlrZU51bWJlcih2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChwb3MpO1xuXG4gIGlmIChjb2RlID09PSBwbHVzIHx8IGNvZGUgPT09IG1pbnVzKSB7XG4gICAgcG9zKys7XG4gIH1cblxuICB3aGlsZSAocG9zIDwgbGVuZ3RoKSB7XG4gICAgY29kZSA9IHZhbHVlLmNoYXJDb2RlQXQocG9zKTtcblxuICAgIGlmIChjb2RlIDwgNDggfHwgY29kZSA+IDU3KSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBwb3MgKz0gMTtcbiAgfVxuXG4gIGNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KHBvcyk7XG4gIG5leHRDb2RlID0gdmFsdWUuY2hhckNvZGVBdChwb3MgKyAxKTtcblxuICBpZiAoY29kZSA9PT0gZG90ICYmIG5leHRDb2RlID49IDQ4ICYmIG5leHRDb2RlIDw9IDU3KSB7XG4gICAgcG9zICs9IDI7XG5cbiAgICB3aGlsZSAocG9zIDwgbGVuZ3RoKSB7XG4gICAgICBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChwb3MpO1xuXG4gICAgICBpZiAoY29kZSA8IDQ4IHx8IGNvZGUgPiA1Nykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcG9zICs9IDE7XG4gICAgfVxuICB9XG5cbiAgY29kZSA9IHZhbHVlLmNoYXJDb2RlQXQocG9zKTtcbiAgbmV4dENvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KHBvcyArIDEpO1xuICBuZXh0TmV4dENvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KHBvcyArIDIpO1xuXG4gIGlmIChcbiAgICAoY29kZSA9PT0gZXhwIHx8IGNvZGUgPT09IEVYUCkgJiZcbiAgICAoKG5leHRDb2RlID49IDQ4ICYmIG5leHRDb2RlIDw9IDU3KSB8fFxuICAgICAgKChuZXh0Q29kZSA9PT0gcGx1cyB8fCBuZXh0Q29kZSA9PT0gbWludXMpICYmXG4gICAgICAgIG5leHROZXh0Q29kZSA+PSA0OCAmJlxuICAgICAgICBuZXh0TmV4dENvZGUgPD0gNTcpKVxuICApIHtcbiAgICBwb3MgKz0gbmV4dENvZGUgPT09IHBsdXMgfHwgbmV4dENvZGUgPT09IG1pbnVzID8gMyA6IDI7XG5cbiAgICB3aGlsZSAocG9zIDwgbGVuZ3RoKSB7XG4gICAgICBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChwb3MpO1xuXG4gICAgICBpZiAoY29kZSA8IDQ4IHx8IGNvZGUgPiA1Nykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcG9zICs9IDE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBudW1iZXI6IHZhbHVlLnNsaWNlKDAsIHBvcyksXG4gICAgdW5pdDogdmFsdWUuc2xpY2UocG9zKVxuICB9O1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/postcss-value-parser/lib/unit.js\n");

/***/ })

};
;