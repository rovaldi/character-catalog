# Additional Questions

## 1. What are Custom Hooks in React?

Custom Hooks are functions prefixed with `use` and allow you to extract and reuse stateful logic between components. They're a way to share behavior without sharing UI.

### Practical example from this project

In this project, I created `useFilters` to handle all filtering and sorting logic:

```ts
// src/pages/ListingPage/useFilters.ts
export const useFilters = () => {
  const [filter, setFilter] = useState<CharacterFilter>({});
  const [sortField, setSortField] = useState<SortField>("name");

  const updateFilter = useCallback((key: keyof CharacterFilter, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilter({});
  }, []);

  const sortCharacters = useCallback(
    (characters: Character[]): Character[] => {
      return [...characters].sort((a, b) => {
        const firstValue = a[sortField]?.toLowerCase() ?? "";
        const secondValue = b[sortField]?.toLowerCase() ?? "";
        return firstValue.localeCompare(secondValue);
      });
    },
    [sortField],
  );

  return { filter, updateFilter, clearFilters, sortField, setSortField, sortCharacters };
};
```

### Why is this useful?

- **Separation of concerns**: The `ListingPage` component focuses on rendering, while `useFilters` handles the logic
- **Testability**: I can test the hook in isolation without rendering any UI
- **Reusability**: If I needed filtering on another page, I could reuse this hook
- **Readability**: The component stays clean and the logic is easy to follow

---

## 2. What advantages does TypeScript offer? What challenges might arise?

### Advantages

- **Errors show up before runtime**: Typos, wrong property names, type mismatches. The compiler catches them before I even run the app
- **Self-documenting code**: Types serve as documentation that stays in sync with the code
- **Safer refactoring**: When you change a type, TypeScript tells you everywhere that needs to be updated
- **Team scalability**: On larger teams, types help developers understand code they didn't write

### Challenges when integrating into an existing project

- **Initial time investment**: Adding types to a large codebase takes time and can slow down feature development initially
- **Learning curve**: Team members unfamiliar with TypeScript need time to learn the type system
- **Strict mode gradual adoption**: You often need to start with loose settings and gradually increase strictness, which can lead to inconsistent typing across the codebase

### My migration strategy

1. **Start with `strict: false`** and enable stricter checks gradually as the team gets comfortable
2. **Configure ESLint to ignore JS files** using overrides, so you can have strict rules for `.ts`/`.tsx` while leaving legacy `.js` files untouched:
3. **Start with small, isolated components** – utility functions, hooks, or leaf components that don't have many dependencies. These are easier to type and give quick wins
4. **Migrate incrementally** – convert one component or module at a time rather than trying to type everything at once. This keeps PRs small and reviewable
5. **All new code is TypeScript**: This is non-negotiable. Otherwise you're just adding to the debt

---

## 3. How would you approach implementing testing in a Frontend application?

### My testing approach

I prioritize integration tests over unit tests because they give more confidence with less effort.

### Types of tests I consider essential

**Unit tests for logic without UI**
- Utility functions, data transformations, etc
- Fast to write, fast to run, easy to maintain

**Integration tests for components**
- Render the component with mocked API responses
- Interact with it like a user would (click, type, wait for content)
- Assert on what the user sees, not on internal state

**E2E tests for critical user flows** (when time allows)
- Login, checkout, main navigation paths
- These catch integration issues between frontend and backend

### Why I prefer `data-testid` over other selectors

I know there's debate about this. My reasoning: tests should be resilient to refactors. If I change a `<div>` to a `<section>` or update the text for i18n, I don't want my tests to break. `data-testid` decouples the test from the markup.

---

## 4. Strategies for distributed teams across time zones

### Communication strategies

- **Async-first communication**: Default to written communication (Slack, docs) that people can respond to on their schedule
- **Clear documentation**: Decisions, context, and how-tos should be written down so anyone can catch up without needing a meeting
- **Overlap hours**: Identify the 2-3 hours where most team members are available and protect that time for important meetings
- **Video for complex topics**: Some discussions are faster face-to-face.

### Workflow strategies

- **Small, focused PRs**: Easier to review asynchronously and reduces blocking time
- **Clear PR descriptions**: Explain what, why, and how to test so reviewers don't need to ask questions
- **CI/CD automation**: Automated tests and deployments mean no one is blocked waiting for someone in another timezone to deploy
- **Shared team calendar**: Visible working hours and holidays prevent scheduling conflicts
- **Respect people's time**: I don't schedule meetings at 7am someone's time just because it's convenient for me

---

## 5. Handling disagreement on technical solutions

### How I approach it

**Start by listening**

My first instinct is to understand their reasoning. "What problem does this solve?" or "What trade-offs did you consider?" usually reveals context I was missing. Sometimes I change my mind after hearing them out.

**Separate the problem from the solution**

When we disagree on *how*, it's often because we have different assumptions about *what* we're solving. I try to step back: What's the actual requirement? What are the constraints? Once we align on that, the "right" solution often becomes clearer.

**Bring data, not opinions**

If the disagreement is about performance, I'd suggest benchmarking both approaches. If it's about maintainability, maybe we prototype each one and see which is easier to extend. Opinions are fine, but data ends arguments faster.

**Know when to commit**

Not every decision needs consensus. If we've discussed it, no one has new information to add, and a decision is needed, I'm fine going with the team's choice even if I'd have done it differently. I'll document my concerns, but then I commit fully to making it work.

### What I try to avoid

- Making it about the person instead of the idea
- Dismissing suggestions before understanding them
- Letting disagreements drag on without resolution, at some point you have to pick a direction and move
- Debating complex issues over text. Written messages lose tone and nuance. If a discussion is getting long or tense, I prefer to jump on a quick call to sort it out