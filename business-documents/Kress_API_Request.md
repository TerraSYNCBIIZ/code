
# Formal API Integration Request for Kress

**To:** The Kress Engineering & Partnership Team
**From:** Wesley Pitts, Founder, KnoxBots LLC (DBA TerraSYNC)
**Date:** October 26, 2023
**Subject:** Partnership and API Integration Request for Kress Robotic Mowers into the TerraSYNC Management Platform

## 1. Introduction

This document outlines a formal request for API access to integrate the Kress Mission series of robotic mowers into TerraSYNC, our comprehensive management platform for robotic turf and groundskeeping equipment. We are highly impressed with the capabilities of Kress robotics and believe that by integrating them into our system, we can create a significantly enhanced and streamlined experience for our mutual customers.

TerraSYNC provides a "single pane of glass" for golf courses, sports facilities, and large commercial properties to manage their entire fleet of autonomous equipment from various manufacturers. Our goal is to unify the operational workflow, from robotic mowers to range pickers and irrigation systems.

## 2. Partnership Value Proposition

We see a powerful opportunity for a synergistic partnership. By integrating Kress mowers into the TerraSYNC ecosystem, you gain:

*   **Increased Stickiness:** Customers using multiple brands of equipment can manage their Kress units from the same central dashboard they use for other robots, making Kress an even more integral part of their daily operations.
*   **Expanded Market Reach:** As we onboard new clients, your product will be presented as a pre-integrated, premier solution for turf management, exposing Kress to a wider audience actively seeking autonomous solutions.
*   **Enhanced Data Insights:** Data from Kress mowers can be correlated with data from other assets (e.g., matching mowing schedules with irrigation cycles) to provide customers with a holistic view of their property's operations.

## 3. Detailed API Requirements

To provide a seamless and valuable user experience, we require access to the following data points and control functions. We are flexible and happy to work with your existing API structure, but this list represents the ideal feature set for a full integration.

### 3.1. Authentication
A secure method for authenticating our backend services with your API on behalf of our mutual customers.
*   **Requirement:** OAuth 2.0 or secure, revocable API key generation.

### 3.2. Asset & Status Information (Real-time Data)
We need to poll for or receive real-time updates on the mower's status. A WebSocket connection would be ideal, but regular polling is also viable.

*   **`getAssetDetails`**: Retrieve a list of all Kress units associated with a customer account, including `unit_id`, `name`, `model`, and `serial_number`.
*   **`getRealTimeStatus(unit_id)`**:
    *   **`location`**: Live GPS coordinates (latitude, longitude).
    *   **`status`**: Current operational state (e.g., `mowing`, `transiting_to_charge`, `charging`, `idle`, `paused`, `error`).
    *   **`battery_percentage`**: Current battery level (0-100).
    *   **`task_progress`**:
        *   `percentage_complete`: The completion percentage of the current zone or task.
        *   `current_zone_id`: The ID of the zone currently being worked on.
    *   **`active_errors`**: A list of any current error codes or messages.

### 3.3. Command & Control
The ability for users to manage operations directly from the TerraSYNC interface.

*   **`startMowing(unit_id, zone_id)`**: Command a unit to begin mowing a specified, predefined zone.
*   **`stopMowing(unit_id)`**: Stop the current task and command the unit to return to its charging station.
*   **`pauseMowing(unit_id)`**: Temporarily pause the current operation.
*   **`resumeMowing(unit_id)`**: Resume a previously paused operation.

### 3.4. Schedule Management
Allow users to view and manage the mower's operational schedule.

*   **`getSchedules(unit_id)`**: Retrieve a list of all scheduled tasks for a specific unit.
*   **`createSchedule(unit_id, task_details)`**: Create a new schedule (e.g., mow Zone A every Monday at 5 AM).
*   **`updateSchedule(schedule_id, new_details)`**: Modify an existing schedule.
*   **`deleteSchedule(schedule_id)`**: Remove a scheduled task.

### 3.5. Zone Management
The ability to see and utilize the operational zones defined in the Kress system.

*   **`getZones()`**: Retrieve all defined mowing zones for a customer's account, ideally with boundary data (e.g., GeoJSON format) to display on our map.

## 4. Next Steps

We are confident that an integration between TerraSYNC and Kress would be highly beneficial for our companies and, most importantly, for our customers.

We would like to propose a brief technical call with our respective engineering teams to discuss the feasibility of these requirements, review your existing API documentation, and outline a path forward.

Thank you for your time and consideration. We look forward to the possibility of working together.

Best regards,

**Wesley Pitts**
Founder
KnoxBots LLC (DBA TerraSYNC) 