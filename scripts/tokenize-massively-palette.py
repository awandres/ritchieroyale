#!/usr/bin/env python3
"""One-shot codemod: replace Massively's hard-coded hex palette with CSS variables.

The template ships 4,700 lines of CSS with its palette inlined at ~180 call sites.
Rewriting them as var() references keeps the cascade identical (the fallbacks are
the original values) while letting styles/massively/css/ritchie.css retheme the
whole site by redefining a handful of custom properties.

Data-URI colours are percent-encoded (%23eeeeee) so plain hex replacement cannot
corrupt them.
"""

import re
import sys
from pathlib import Path

# Ordered longest-first so #ffffff is never partially matched as #fff.
PALETTE = [
    ("#18bfef", "--m-accent"),
    ("#ffffff", "--m-light"),
    ("#f5f5f5", "--m-bg-alt"),
    ("#eeeeee", "--m-border"),
    ("#e2e2e2", "--m-border-alt"),
    ("#b3b7bb", "--m-muted-light"),
    ("#909498", "--m-muted-alt"),
    ("#717981", "--m-muted"),
    ("#212931", "--m-dark"),
    ("#1e252d", "--m-darker"),
]


def tokenize(css: str) -> tuple[str, dict[str, int]]:
    counts: dict[str, int] = {}
    for hex_value, var_name in PALETTE:
        pattern = re.compile(re.escape(hex_value), re.IGNORECASE)
        css, n = pattern.subn(f"var({var_name}, {hex_value})", css)
        counts[var_name] = n
    return css, counts


def main() -> int:
    target = Path(sys.argv[1])
    css = target.read_text()

    if "var(--m-accent" in css:
        print(f"{target} already tokenized; nothing to do.")
        return 0

    css, counts = tokenize(css)
    target.write_text(css)

    for var_name, n in counts.items():
        print(f"  {var_name:18} {n:4} replacements")
    print(f"Tokenized {target} ({sum(counts.values())} total).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
