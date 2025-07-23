
# Formal API Integration Request for Korechi Pikr

**To:** The Korechi Engineering & Partnership Team
**From:** Wesley Pitts, Founder, KnoxBots LLC (DBA TerraSYNC)
**Date:** October 26, 2023
**Subject:** Partnership and API Integration Request for Korechi Pikr into the TerraSYNC Management Platform

## 1. Introduction

This document outlines a formal request for API access to integrate the Korechi Pikr autonomous range picker into TerraSYNC, our comprehensive management platform for robotic turf and groundskeeping equipment. We are incredibly impressed with the Pikr's capabilities and believe that by integrating it into our system, we can create a significantly enhanced and streamlined experience for our mutual customers.

TerraSYNC provides a "single pane of glass" for golf courses, sports facilities, and large commercial properties to manage their entire fleet of autonomous equipment from various manufacturers. Our goal is to unify the operational workflow, from robotic mowers to utility vehicles and, crucially, range pickers.

## 2. Partnership Value Proposition

We see a powerful opportunity for a synergistic partnership. By integrating Pikr into the TerraSYNC ecosystem, you gain:

*   **Increased Stickiness:** Customers using multiple brands of equipment can manage their Pikr units from the same central dashboard they use for their mowers and other robots, making Pikr an even more integral part of their daily operations.
*   **Expanded Market Reach:** As we onboard new clients, your product will be presented as a pre-integrated, premier solution for range management, exposing Pikr to a wider audience actively seeking autonomous solutions.
*   **Enhanced Data Insights:** Data from Pikr can be correlated with data from other assets (e.g., matching range picking schedules with mowing schedules) to provide customers with a holistic view of their property's operations.

## 3. Detailed API Requirements

To provide a seamless and valuable user experience, we require access to the following data points and control functions. We are flexible and happy to work with your existing API structure, but this list represents the ideal feature set for a full integration.

### 3.1. Authentication
A secure method for authenticating our backend services with your API on behalf of our mutual customers.
*   **Requirement:** OAuth 2.0 or secure, revocable API key generation.

### 3.2. Asset & Status Information (Real-time Data)
We need to poll for or receive real-time updates on the picker's status. A WebSocket connection would be ideal, but regular polling is also viable.

*   **`getAssetDetails`**: Retrieve a list of all Pikr units associated with a customer account, including `unit_id`, `name`, `model`, and `serial_number`.
*   **`getRealTimeStatus(unit_id)`**:
    *   **`location`**: Live GPS coordinates (latitude, longitude).
    *   **`status`**: Current operational state (e.g., `picking`, `transiting_to_dump`, `dumping`, `charging`, `idle`, `paused`, `error`).
    *   **`battery_percentage`**: Current battery level (0-100).
    *   **`ball_count`**: The current number of collected balls in the basket.
    *   **`task_progress`**:
        *   `percentage_complete`: The completion percentage of the current zone or task.
        *   `current_zone_id`: The ID of the zone currently being worked on.
    *   **`active_errors`**: A list of any current error codes or messages.

### 3.3. Command & Control
The ability for users to manage operations directly from the TerraSYNC interface.

*   **`startTask(unit_id, zone_id)`**: Command a unit to begin working on a specified, predefined zone.
*   **`stopTask(unit_id)`**: Stop the current task and command the unit to return to its charging/dumping station.
*   **`pauseTask(unit_id)`**: Temporarily pause the current operation.
*   **`resumeTask(unit_id)`**: Resume a previously paused operation.

### 3.4. Schedule Management
Allow users to view and manage the Pikr's operational schedule.

*   **`getSchedules(unit_id)`**: Retrieve a list of all scheduled tasks for a specific unit.
*   **`createSchedule(unit_id, task_details)`**: Create a new schedule (e.g., pick Zone A every Monday at 5 AM).
*   **`updateSchedule(schedule_id, new_details)`**: Modify an existing schedule.
*   **`deleteSchedule(schedule_id)`**: Remove a scheduled task.

### 3.5. Zone Management
The ability to see and utilize the operational zones defined in the Pikr system.

*   **`getZones()`**: Retrieve all defined range-picking zones for a customer's account, ideally with boundary data (e.g., GeoJSON format) to display on our map.

## 4. Next Steps

We are confident that an integration between TerraSYNC and Korechi Pikr would be highly beneficial for our companies and, most importantly, for our customers.

We would like to propose a brief technical call with our respective engineering teams to discuss the feasibility of these requirements, review your existing API documentation, and outline a path forward.

Thank you for your time and consideration. We look forward to the possibility of working together.

Best regards,

**Wesley Pitts**
Founder
KnoxBots LLC (DBA TerraSYNC) 