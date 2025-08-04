# Legal Compliance Software - UX Specifications

## Design System

### Brand Identity

- **Primary Color**: #0D47A1 (Deep Blue) - Represents trust, reliability, and professionalism
- **Secondary Color**: #00B894 (Teal Green) - Represents success, completion, and positive progress
- **Accent Colors**:
  - #FF5252 (Alert Red) - For critical items requiring attention
  - #FFC107 (Warning Yellow) - For items needing review
  - #4CAF50 (Success Green) - For completed items
  - #E0E0E0 (Light Gray) - For inactive or disabled elements

### Typography

- **Primary Font**: Inter (Sans-serif)
  - Headings: Semi-Bold (600)
  - Body: Regular (400)
  - UI Elements: Medium (500)
- **Secondary Font**: DM Serif Display (Used sparingly for marketing elements)
- **Font Sizes**:
  - H1: 28px (desktop) / 24px (mobile)
  - H2: 22px (desktop) / 20px (mobile)
  - H3: 18px (desktop) / 16px (mobile)
  - Body: 16px (desktop) / 14px (mobile)
  - Small text: 14px (desktop) / 12px (mobile)
  - Micro text: 12px (desktop) / 10px (mobile)

### Component Library

#### Navigation

- **Top Navigation Bar**:
  - Height: 64px
  - Fixed position
  - Contains: Logo, primary navigation, user profile, notifications icon
  - Mobile: Collapses to hamburger menu

- **Sidebar Navigation**:
  - Width: 240px (desktop) / Full width slide-in (mobile)
  - Collapsible to 72px (icon-only mode)
  - Contains: Secondary navigation, business selector, help center access

- **Breadcrumbs**:
  - Display current location in app hierarchy
  - Clickable for navigation to parent levels
  - Truncates when space is limited

#### Cards & Containers

- **Requirement Card**:
  - Border-radius: 8px
  - Padding: 16px
  - Shadow: 0px 2px 4px rgba(0, 0, 0, 0.1)
  - Status indicator: Left border (4px) with color coding
  - Contains: Title, due date, status, priority indicator, quick actions

- **Dashboard Widgets**:
  - Border-radius: 8px
  - Min-height: 180px
  - Padding: 16px
  - Header: Title, action buttons, filter dropdown
  - Content: Varies by widget type
  - Footer: View all link when applicable

- **Modal Dialogs**:
  - Max-width: 560px for standard, 800px for large
  - Border-radius: 8px
  - Backdrop: Semi-transparent (rgba(0, 0, 0, 0.5))
  - Animation: Fade in, slide up (200ms)
  - Focus trap for accessibility

#### Forms & Inputs

- **Text Inputs**:
  - Height: 48px
  - Border-radius: 4px
  - Border: 1px solid #BDBDBD
  - Focus state: Border color #0D47A1, subtle glow
  - Error state: Border color #FF5252, error message below
  - Padding: 16px horizontal

- **Dropdown Selects**:
  - Custom styling to match text inputs
  - Support for search/filtering in long lists
  - Multi-select with chips for selected options
  - Clear all button when multiple items selected

- **Checkboxes & Radio Buttons**:
  - Custom styling with brand colors
  - Larger touch targets (min 24px)
  - Animation on state change

- **Buttons**:
  - Primary: Solid background (#0D47A1), white text
  - Secondary: Outlined (#0D47A1 border), brand color text
  - Tertiary: No border or background, brand color text
  - Height: 48px (standard), 36px (compact)
  - Border-radius: 4px
  - Loading state: Replaces text with spinner
  - Disabled state: Reduced opacity (0.5)

#### Status Indicators

- **Progress Bars**:
  - Height: 8px
  - Border-radius: 4px
  - Color-coded by status
  - Animated for processes in progress

- **Badges**:
  - Small: 8px diameter (dot notification)
  - Standard: 20px diameter with number
  - Text badges: Pill shape with 8px padding, 4px border-radius

- **Toast Notifications**:
  - Position: Bottom center
  - Width: 320px (desktop) / 90% of viewport (mobile)
  - Auto-dismiss after 5 seconds (configurable)
  - Action buttons when applicable
  - Color-coded by message type

## Screen Layouts

### Dashboard

```
+-----------------------------------------------------------------------+
|  Logo  |  Search  |  Navigation Items       |  Notifications  | User  |
+--------+----------+-------------------------+-----------------+-------+
|                                                                       |
|  Sidebar  |  Compliance Overview                      |  Calendar     |
|           |  [Progress indicators, summary stats]     |  [Upcoming    |
|  - Home   |                                           |   deadlines]  |
|  - Reqs   +-------------------------------------------+---------------+
|  - Docs   |  Critical Requirements       |  Recent Activity           |
|  - Files  |  [List of high-priority      |  [Timeline of actions,     |
|  - AI     |   compliance items]          |   status changes]          |
|  - Help   |                              |                            |
|           +------------------------------+----------------------------+
|           |  Compliance by Jurisdiction                               |
|           |  [Interactive map/visualization of requirements           |
|           |   by location - federal, state, county, city]            |
+-----------+-----------------------------------------------------------+
```

### Compliance Requirement Details

```
+-----------------------------------------------------------------------+
|  Logo  |  Search  |  Navigation Items       |  Notifications  | User  |
+--------+----------+-------------------------+-----------------+-------+
|                                                                       |
|  Sidebar  |  Requirement: [Title]                     |  Status       |
|           |  Breadcrumbs > Category > Requirement     |  [Current     |
|           |                                           |   status]     |
|           +-------------------------------------------+---------------+
|           |  Description                              |  Details      |
|           |  [Detailed information about the          |  Due: [date]  |
|           |   requirement, written in simplified      |  Filed: [Y/N] |
|           |   language with AI assistance]            |  Agency: [X]  |
|           |                                           |  Fee: [$]     |
|           +-------------------------------------------+---------------+
|           |  Required Documents            |  Filing Instructions     |
|           |  [ ] Document 1 (template)     |  [Step-by-step guide     |
|           |  [ ] Document 2 (upload)       |   for submission with    |
|           |  [ ] Document 3 (generated)    |   visual aids]           |
|           +------------------------------+----------------------------+
|           |  Related Requirements        |  AI Assistance             |
|           |  - [Related item 1]          |  [Ask questions about this |
|           |  - [Related item 2]          |   requirement]             |
+-----------+------------------------------+----------------------------+
```

### Smart Questionnaire Flow

```
+-----------------------------------------------------------------------+
|  Logo                                            |       Exit/Save     |
+--------------------------------------------------+-------------------+
|                                                                       |
|  Step 3 of 8: Business Activities                                     |
|  [Progress bar]                                                       |
|                                                                       |
|  Question: Does your business involve any of the following activities?|
|                                                                       |
|  [ ] Food preparation or service                                      |
|  [ ] Alcoholic beverage sales                                         |
|  [ ] Retail sales of tangible goods                                   |
|  [ ] Professional services (legal, accounting, etc.)                  |
|  [ ] Healthcare services                                              |
|  [ ] Construction or contracting                                      |
|  [ ] Manufacturing or production                                      |
|  [ ] Transportation services                                          |
|                                                                       |
|  + Add a custom activity                                              |
|                                                                       |
|  [AI Assistance: Based on your industry (restaurant), you likely      |
|   need to select "Food preparation" and possibly "Alcoholic beverage  |
|   sales" if you serve alcohol]                                        |
|                                                                       |
|                                                Back   |   Continue    |
+-----------------------------------------------------------------------+
```

### Document Generation Interface

```
+-----------------------------------------------------------------------+
|  Logo  |  Search  |  Navigation Items       |  Notifications  | User  |
+--------+----------+-------------------------+-----------------+-------+
|                                                                       |
|  Sidebar  |  Generate: Business License Application                   |
|           |                                                           |
|           |  Preview                        |  Form Fields            |
|           |  +---------------------------+  |  Business Name:         |
|           |  |                           |  |  [Pre-filled]           |
|           |  |  Document preview with    |  |                         |
|           |  |  highlighting of fields   |  |  Business Address:      |
|           |  |  being edited             |  |  [Pre-filled]           |
|           |  |                           |  |                         |
|           |  |                           |  |  Owner Name:            |
|           |  |                           |  |  [Pre-filled]           |
|           |  |                           |  |                         |
|           |  |                           |  |  Business Activity:     |
|           |  |                           |  |  [Dropdown selection]   |
|           |  +---------------------------+  |                         |
|           |                                 |  [Additional fields     |
|           |  [Page navigation]              |   based on document]    |
|           |                                 |                         |
|           +---------------------------+-----+-------------------------+
|           |                  Cancel   |   Save Draft   |   Generate   |
+-----------+--------------------------------------------------+--------+
```

### AI Compliance Assistant Interface

```
+-----------------------------------------------------------------------+
|  Logo  |  Search  |  Navigation Items       |  Notifications  | User  |
+--------+----------+-------------------------+-----------------+-------+
|                                                                       |
|  Sidebar  |  AI Compliance Assistant                                  |
|           |                                                           |
|           |  Chat History                   |  Current Conversation   |
|           |  +---------------------------+  |  +-------------------+  |
|           |  | Today                     |  |  | AI: How can I     |  |
|           |  | - Tax filing questions    |  |  | help with your    |  |
|           |  | - Alcohol license help    |  |  | compliance needs  |  |
|           |  |                           |  |  | today?            |  |
|           |  | Yesterday                 |  |  |                   |  |
|           |  | - Employee requirements   |  |  | You: What permits |  |
|           |  | - State filing deadlines  |  |  | do I need for a   |  |
|           |  |                           |  |  | food truck in     |  |
|           |  | [Clear history]           |  |  | Nashville?        |  |
|           |  +---------------------------+  |  |                   |  |
|           |                                 |  | AI: For a food    |  |
|           |  Context                        |  | truck in Nashville|  |
|           |  [x] Business profile           |  | you'll need:      |  |
|           |  [x] Current requirements       |  | - Business license|  |
|           |  [x] Filing history             |  | - Food service    |  |
|           |  [ ] Document content           |  |   permit          |  |
|           |                                 |  | - Health dept     |  |
|           |                                 |  |   inspection      |  |
|           |                                 |  | ...               |  |
|           |                                 |  +-------------------+  |
|           |                                 |                         |
|           |                                 |  Type your question...  |
|           |                                 |  [Microphone] [Attach]  |
+-----------+---------------------------------+-------------------------+
```

## Interface Behavior Guidelines

### Responsive Design

- **Breakpoints**:
  - Mobile: 0-767px
  - Tablet: 768-1023px
  - Desktop: 1024px+

- **Mobile Adaptations**:
  - Convert multi-column layouts to single column
  - Stack card elements vertically
  - Collapse sidebar into hamburger menu
  - Use bottom navigation for primary actions
  - Reduce padding and margins by 25%

- **Touch Considerations**:
  - Minimum touch target size: 44px × 44px
  - Gesture support: Swipe for card navigation, pull-to-refresh
  - Haptic feedback for important actions

### Loading States

- **Initial Page Load**:
  - Skeleton screens for content areas
  - Progressive loading of content (critical elements first)
  - Above-fold content prioritized

- **Form Submission**:
  - Disable submit button during processing
  - Show progress indicator
  - Transition to success/error state with animation

- **Data Fetching**:
  - Local content first with background refresh
  - Optimistic UI updates for common actions
  - Pull-to-refresh for manual data updates

### Error States & Recovery

- **Input Validation**:
  - Real-time validation where appropriate
  - Clear error messages with resolution guidance
  - Field-level error indicators
  - Form-level summary for multiple errors

- **Empty States**:
  - Contextual illustrations for empty data sections
  - Guided actions to fill empty states
  - Educational content when relevant

- **System Errors**:
  - User-friendly error messages
  - Automatic retry mechanisms
  - Offline mode with local storage
  - Error reporting with diagnostic information

### Animation & Transitions

- **Principles**:
  - Purpose-driven animation only
  - Maximum duration: 300ms for standard transitions
  - Easing functions: Ease-out for entering, ease-in for exiting

- **Element Transitions**:
  - Card hover: Subtle elevation increase (shadow change)
  - Button hover: Background lightening (10%)
  - Status changes: Color transitions with subtle movement

- **Page Transitions**:
  - Enter: Fade in, slight rise (100ms)
  - Exit: Quick fade out (80ms)
  - Tab switching: Horizontal slide

### Accessibility Guidelines

- **Color & Contrast**:
  - Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
  - Non-color-dependent status indicators (icons/patterns in addition to color)
  - High contrast mode support

- **Keyboard Navigation**:
  - Logical tab order matching visual flow
  - Visible focus indicators
  - Skip navigation links
  - Keyboard shortcuts for power users (with documentation)

- **Screen Readers**:
  - ARIA labels for all interactive elements
  - Proper heading hierarchy
  - Alternative text for images and graphics
  - Announcements for dynamic content changes

- **Cognitive Considerations**:
  - Progressive disclosure of complex information
  - Consistent placement of recurring elements
  - Clear language free of jargon
  - Time-insensitive interactions (configurable timeouts)

## UX Flows & Microinteractions

### Onboarding First-time Experience

1. **Welcome Screen**
   - Personalized greeting
   - Brief product overview (3 key benefits)
   - Clear CTA to begin setup

2. **Setup Process Visualization**
   - Visual map of setup journey
   - Estimated time to complete
   - Ability to save progress and resume

3. **Guided Tour Elements**
   - Spotlight highlights for key features
   - Interactive tutorial cards
   - Dismissible but retrievable later
   - Contextual help based on current screen

4. **Success Milestones**
   - Celebration animations for key completions
   - Progress tracking (profile completeness percentage)
   - Next step recommendations

### Data Visualization Standards

- **Compliance Status Indicators**:
  - Circular progress charts for overall compliance
  - Horizontal stacked bars for requirement categories
  - Color-coding consistent with status system

- **Timeline Visualizations**:
  - Gantt-style charts for deadline planning
  - Milestone markers for critical dates
  - Today indicator with upcoming emphasis

- **Geographical Visualizations**:
  - Interactive maps for multi-jurisdiction businesses
  - Color intensity for requirement density
  - Drill-down capability from national to local

### Notification System Behaviors

- **Notification Types**:
  - Critical alerts: Persistent, requires dismissal
  - Warnings: Semi-persistent, auto-dismiss after interaction
  - Information: Brief, auto-dismiss after short delay

- **Delivery Preferences**:
  - Channel selection (email, SMS, in-app, push)
  - Frequency controls (immediate, daily digest, weekly summary)
  - Quiet hours settings

- **Escalation Logic**:
  - Progressive urgency based on deadline proximity
  - Channel expansion as deadlines approach
  - Responsible party escalation for overdue items

### Progress Tracking & Gamification

- **Visual Progress Elements**:
  - Business compliance score (0-100%)
  - Achievement badges for compliance milestones
  - Streak tracking for on-time filing

- **Reward Mechanisms**:
  - Feature unlocks based on profile completion
  - Recognition for proactive compliance
  - Referral incentives with progress visualization

- **Comparison Elements**:
  - Industry benchmark comparisons
  - Anonymous peer comparison
  - Historical self-comparison 