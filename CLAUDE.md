# Project Guidelines for Claude Code + Serena MCP

## Essential Serena Usage Rules

### 1. Project Activation & Onboarding
- Always call `mcp__serena__activate_project` when switching projects
- Run `mcp__serena__check_onboarding_performed` after project activation
- If onboarding not complete, call `mcp__serena__onboarding` and follow instructions
- Use `mcp__serena__get_current_config` to verify active project and modes

### 2. Memory Management
- Use `mcp__serena__list_memories` to see available project memories
- Read relevant memories with `mcp__serena__read_memory` before starting work
- Create memories with `mcp__serena__write_memory` for important project insights
- Always check for "suggested shell commands" memory before using `mcp__serena__execute_shell_command`

### 3. Code Analysis Workflow
- Use `mcp__serena__get_symbols_overview` for high-level code understanding
- Use `mcp__serena__find_symbol` for specific symbol searches
- Use `mcp__serena__find_referencing_symbols` to understand dependencies
- Use `mcp__serena__search_for_pattern` for flexible pattern matching

### 4. File Operations Priority
- Prefer symbolic operations over direct file editing:
  - `mcp__serena__replace_symbol_body` for function/class changes
  - `mcp__serena__insert_after_symbol` / `mcp__serena__insert_before_symbol` for additions
- Use `mcp__serena__replace_regex` for complex text replacements
- Only use `mcp__serena__create_text_file` for new files when absolutely necessary

### 5. Thinking & Planning Tools
- **ALWAYS** call `mcp__serena__think_about_collected_information` after research phases
- **ALWAYS** call `mcp__serena__think_about_task_adherence` before making code changes
- **ALWAYS** call `mcp__serena__think_about_whether_you_are_done` when task seems complete
- **ALWAYS** call `mcp__serena__summarize_changes` after completing coding tasks

### 6. Shell Command Safety
- Check "suggested shell commands" memory before using `mcp__serena__execute_shell_command`
- Never execute destructive commands without explicit user permission
- Use `cwd` parameter to specify working directory when needed

## Project Indexing & Setup

### Language Server Management
- Call `mcp__serena__restart_language_server` if editing errors occur
- This ensures symbol analysis stays current with file changes

### Mode Configuration
- Use `mcp__serena__switch_modes` to activate appropriate modes:
  - `["editing", "interactive"]` for development work
  - `["planning", "one-shot"]` for analysis tasks

### Directory Structure Analysis
- Start with `mcp__serena__list_dir` for project overview
- Use `mcp__serena__find_file` to locate specific files by pattern
- Build understanding gradually from root to specific areas

## Common Commands to Remember

### Build & Test Commands
```bash
# Add your project-specific commands here, e.g.:
npm run build
npm run test
npm run lint
npm run typecheck
```

### Development Server
```bash
# Add your project-specific dev server command, e.g.:
npm run dev
npm start
```

## Best Practices

1. **Always read memories first** - Check existing project knowledge before starting
2. **Use symbolic operations** - Prefer symbol-based editing over direct file manipulation  
3. **Think before acting** - Use the thinking tools at appropriate workflow stages
4. **Maintain context** - Write useful memories for future sessions
5. **Verify changes** - Run appropriate build/test commands after modifications

## Workflow Template

```
1. Activate project & check onboarding
2. List & read relevant memories
3. Get symbols overview of relevant areas
4. Search for specific symbols/patterns as needed
5. Think about collected information
6. Think about task adherence
7. Make necessary changes using symbolic operations
8. Think about whether done
9. Summarize changes
10. Run build/test commands to verify
```

This ensures consistent, efficient use of Serena's capabilities across all development sessions.