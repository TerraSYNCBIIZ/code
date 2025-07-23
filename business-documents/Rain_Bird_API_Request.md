
# Formal API Integration Request for Rain Bird

**To:** The Rain Bird Engineering & Partnership Team
**From:** Wesley Pitts, Founder, KnoxBots LLC (DBA TerraSYNC)
**Date:** October 26, 2023
**Subject:** Partnership and API Integration Request for Rain Bird IQ Platform into the TerraSYNC Management Platform

## 1. Introduction

This document outlines a formal request for API access to integrate the Rain Bird IQ Platform into TerraSYNC, our comprehensive management platform for robotic turf and groundskeeping equipment. We recognize Rain Bird as a leader in irrigation technology and believe that by integrating your systems, we can offer a significantly more holistic and efficient experience for our mutual customers, particularly in the golf and large commercial property sectors.

TerraSYNC provides a "single pane of glass" for grounds managers to unify the operational workflow of their entire fleet of autonomous equipment, from robotic mowers to utility vehicles. Integrating intelligent irrigation control is a critical component of this unified vision.

## 2. Partnership Value Proposition

We see a powerful opportunity for a synergistic partnership. By integrating the IQ Platform into the TerraSYNC ecosystem, you gain:

*   **Increased Stickiness:** Customers using our platform to manage their robotic fleets can control their Rain Bird irrigation systems from the same dashboard, making the IQ Platform an even more integral part of their daily operations.
*   **Expanded Market Reach:** As we onboard new clients, your product will be presented as a pre-integrated, premier solution for irrigation management, exposing the IQ Platform to a wider audience actively seeking integrated, autonomous solutions.
*   **Enhanced Data Correlation:** Data from Rain Bird systems (e.g., watering schedules) can be correlated with data from other assets (e.g., mowing schedules, soil sensor readings) to provide customers with unparalleled insights into their property's conditions and operational efficiency.

## 3. Detailed API Requirements

To provide a seamless and valuable user experience, we require access to the following data points and control functions. We are flexible and happy to work with your existing API structure, but this list represents the ideal feature set for a full integration.

### 3.1. Authentication
A secure method for authenticating our backend services with your API on behalf of our mutual customers.
*   **Requirement:** OAuth 2.0 or secure, revocable API key generation.

### 3.2. Controller & Station Status (Real-time Data)
We need to poll for or receive real-time updates on irrigation system status.

*   **`getControllers`**: Retrieve a list of all irrigation controllers associated with a customer account.
*   **`getStations(controller_id)`**: Retrieve a list of all stations (zones) for a given controller, including `station_id`, `name`, and `location_description`.
*   **`getStationStatus(station_id)`**:
    *   **`status`**: Current state (e.g., `watering`, `idle`, `paused`, `fault`).
    *   **`active_schedule`**: The name or ID of the currently running schedule.
    *   **`last_run_time`**: Timestamp of the last time the station ran.
    *   **`next_run_time`**: Timestamp of the next scheduled run.

### 3.3. Command & Control
The ability for users to manage irrigation operations directly from the TerraSYNC interface.

*   **`startWatering(station_id, duration_minutes)`**: Command a station to begin watering for a specified duration.
*   **`stopWatering(station_id)`**: Stop a station that is currently watering.
*   **`pauseController(controller_id)`**: Pause all activity on a controller.
*   **`resumeController(controller_id)`**: Resume normal operations on a controller.

### 3.4. Schedule Management
Allow users to view and manage their existing irrigation schedules.

*   **`getSchedules(controller_id)`**: Retrieve a list of all watering schedules for a specific controller.
*   **`enableSchedule(schedule_id)`**: Enable a disabled schedule.
*   **`disableSchedule(schedule_id)`**: Disable a schedule without deleting it.

### 3.5. Historical Data
Access to historical data for reporting and analysis.

*   **`getRunHistory(controller_id, start_date, end_date)`**: Retrieve a log of all watering events for a controller within a given date range, including station, duration, and completion status.

## 4. Next Steps

We are confident that an integration between TerraSYNC and the Rain Bird IQ Platform would be highly beneficial for our companies and, most importantly, for our customers.

We would like to propose a brief technical call with our respective engineering teams to discuss the feasibility of these requirements and review your existing API documentation.

Thank you for your time and consideration. We look forward to the possibility of working together.

Best regards,

**Wesley Pitts**
Founder
KnoxBots LLC (DBA TerraSYNC) 