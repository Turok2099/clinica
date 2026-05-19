---
name: Skill Creator
description: Use this skill when asked to create a new skill or meta-skill for the application or agent. This skill provides instructions on how to architect and implement robust agent skills.
---

# Skill Creator

When you receive a request to create a new skill for the Antigravity agent, you are acting as a Meta-Skill Architect. Follow these step-by-step instructions to create robust, helpful skills.

## 1. Skill Structure

All skills live in either a workspace-specific directory (`.agents/skills/<skill-folder>/`) or a global directory (`~/.gemini/antigravity/skills/<skill-folder>/`). For project-specific skills, use the workspace directory.

A standard skill folder looks like this:
- `SKILL.md` (Required): The main instruction file and entry point for the agent.
- `scripts/` (Optional): Helper scripts/code.
- `resources/` (Optional): Auxiliary files or templates.

## 2. Implement the `SKILL.md` File

Every `SKILL.md` file **must** begin with a YAML frontmatter containing `name` and `description`. The description is critical because it's what the agent reads when deciding if it should use the skill.

**Example Base Template:**
```markdown
---
name: Name of the Skill
description: Clear, 1-2 sentence description detailing EXACTLY when the agent should use this skill.
---

# [Skill Name]

Provide detailed instructions here on how the agent should leverage this skill.

## Procedure
1. Step one...
2. Step two...

## Best Practices
- Important rule here...
- Another important rule...
```

## 3. Best Practices for Skill Authoring

1. **Keep Skills Focused:** Ensure each skill has a single, core responsibility.
2. **Clear Decision Trees:** If a skill handles complex processes, provide clear "if-then" instructions to guide the agent through edge cases.
3. **Use Scripts as Black Boxes:** If the skill requires complex text processing or network calls, write a script (e.g., Python, Bash) inside `scripts/`, and tell the agent to execute it using its `run_command` tool.
4. **Be Specific:** Tell the agent *what* to do and *how* to do it. Avoid ambiguity.

## 4. Execution Steps

1. **Understand Requirements:** Identify what the target skill is supposed to do.
2. **Setup Folder:** Create the folder `.agents/skills/<skill_name>`.
3. **Draft SKILL.md:** Create the `.agents/skills/<skill_name>/SKILL.md` file with the drafted instructions and YAML frontmatter.
4. **Validation:** Review the created user instructions to make sure they are unambiguous. Recommend testing the new skill if needed.
