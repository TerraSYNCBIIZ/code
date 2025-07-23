// Constants for calculations
const ROBOT_BASE_COST = 40000;  // Updated base cost of robot
const ROBOT_MAINTENANCE_PERCENT = 0.05;  // 5% of base cost for annual maintenance
const ROBOT_MAINTENANCE = ROBOT_BASE_COST * ROBOT_MAINTENANCE_PERCENT;  // Annual maintenance
const ROBOT_DEPRECIATION_YEARS = 5;  // Years for depreciation
const ROBOT_ELECTRICITY_HOURLY = 0.75;  // Increased hourly electricity cost

// Traditional method costs
const TRADITIONAL_GANG_COST = 6000;  // Updated cost per gang
const UTV_COST = 15000;  // Cost of utility vehicle
const TRADITIONAL_MAINTENANCE_PERCENT = 0.1;  // 10% of equipment cost for maintenance
const TRADITIONAL_DEPRECIATION_YEARS = 3;  // Years for depreciation
const TRADITIONAL_GAS_HOURLY = 1.5;  // Gallons per hour

// Operating days by climate zone
const OPERATING_DAYS = {
  southern: 300,  // Longer growing season
  transition: 240  // Shorter growing season
};

const DAYS_PER_YEAR = 365;

// Debounce function to prevent excessive calculations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format currency with proper rounding
function formatCurrency(value) {
  // Handle edge cases
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return '0.00';
  }
  
  // Round to 2 decimal places to avoid floating point issues
  const roundedValue = Math.round(value * 100) / 100;
  
  return new Intl.NumberFormat('en-US', { 
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(roundedValue);
}

// Smooth animation function with RAF and proper timing
function animateValue(start, end, duration, callback) {
  // Handle edge cases
  if (typeof start !== 'number' || typeof end !== 'number' || 
      !Number.isFinite(start) || !Number.isFinite(end)) {
    callback(end);
    return;
  }

  const startTime = performance.now();
  let frameId;

  const updateValue = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Smooth easing function
    const easeOutQuart = 1 - (1 - progress) ** 4;
    const current = start + (end - start) * easeOutQuart;
    
    callback(current);
    
    if (progress < 1) {
      frameId = requestAnimationFrame(updateValue);
    }
  };
  
  frameId = requestAnimationFrame(updateValue);

  // Cleanup function to cancel animation if needed
  return () => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  };
}

// Slider component with enhanced stability
function Slider(props) {
  const { label, min, max, value, step, onChange, unit, description, minLabel, maxLabel } = props;
  const [isAnimating, setIsAnimating] = React.useState(false);
  
  const handleChange = React.useCallback((e) => {
    const newValue = Number.parseFloat(e.target.value);
    if (!Number.isNaN(newValue) && Number.isFinite(newValue)) {
      onChange(newValue);
      
      // Add faster ripple effect to slider value
      const valueElement = e.target.parentElement.querySelector('.slider-value');
      if (valueElement && !isAnimating) {
        setIsAnimating(true);
        valueElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
          valueElement.style.transform = 'scale(1)';
          setIsAnimating(false);
        }, 100);
      }
    }
  }, [onChange, isAnimating]);
  
  return React.createElement(
    'div',
    { className: 'slider-container' },
    React.createElement(
      'div',
      { className: 'slider-label' },
      React.createElement('span', null, label),
      React.createElement(
        'span',
        { 
          className: 'slider-value',
          style: { transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }
        },
        unit === '$' ? `$${value}` : `${value} ${unit}`
      )
    ),
    React.createElement('input', {
      type: 'range',
      min: min,
      max: max,
      value: value,
      step: step,
      onChange: handleChange,
      onInput: handleChange,
      style: { 
        touchAction: 'none',
        WebkitAppearance: 'none',
        cursor: 'pointer'
      }
    }),
    React.createElement(
      'div',
      { className: 'slider-endpoints' },
      React.createElement('span', null, minLabel || (unit === '$' ? `$${min}` : `${min} ${unit}`)),
      React.createElement('span', null, maxLabel || (unit === '$' ? `$${max}` : `${max} ${unit}`))
    ),
    description && React.createElement('div', { className: 'slider-description' }, description)
  );
}

// Enhanced Result Item component with cleanup
function ResultItem(props) {
  const { label, value, isSubLabel, isSavings } = props;
  const [displayValue, setDisplayValue] = React.useState(value);
  const animationCleanupRef = React.useRef(null);
  
  React.useEffect(() => {
    // Clean up previous animation if it exists
    if (animationCleanupRef.current) {
      animationCleanupRef.current();
    }

    try {
      const start = Number.parseFloat(displayValue.replace(/,/g, ''));
      const end = Number.parseFloat(value.replace(/,/g, ''));
      
      if (!Number.isNaN(start) && !Number.isNaN(end) && 
          Number.isFinite(start) && Number.isFinite(end)) {
        animationCleanupRef.current = animateValue(start, end, 200, (current) => {
          setDisplayValue(formatCurrency(current));
        });
      } else {
        setDisplayValue(value);
      }
    } catch (error) {
      console.error('Animation error:', error);
      setDisplayValue(value);
    }

    return () => {
      if (animationCleanupRef.current) {
        animationCleanupRef.current();
      }
    };
  }, [value, displayValue]);

  return React.createElement(
    'div',
    { className: `result-item${isSavings ? ' savings' : ''}` },
    React.createElement('div', { className: 'result-label' }, label),
    isSubLabel && React.createElement('div', { className: 'result-label' }, '*Including Depreciation*'),
    React.createElement('div', { className: 'result-value' }, displayValue)
  );
}

// Enhanced Disclaimer Component
function Disclaimer() {
  return React.createElement(
    'div',
    { className: 'disclaimer' },
    React.createElement('p', null, [
      'This cost comparison tool by ',
      React.createElement('strong', null, 'KNOXBOTS'),
      ' is provided ',
      React.createElement('strong', null, 'strictly for estimation purposes'),
      ' and should ',
      React.createElement('strong', null, 'not be considered as professional financial guidance or advisory services.'),
      ' All estimates rely on data you provide, and real-world outcomes ',
      React.createElement('strong', null, 'will likely differ'),
      ' based on economic conditions, unexpected costs, and various operational factors not accounted for in this simplified model.'
    ])
  );
}

// Climate Zone selector component
function ClimateSelector(props) {
  const { value, onChange } = props;
  
  return React.createElement(
    'div',
    { className: 'climate-selector' },
    React.createElement('div', { className: 'selector-label' }, 'Climate Zone'),
    React.createElement(
      'div',
      { className: 'selector-options' },
      React.createElement(
        'button',
        {
          type: 'button',
          className: `zone-button${value === 'southern' ? ' active' : ''}`,
          onClick: () => onChange('southern')
        },
        'Southern'
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          className: `zone-button${value === 'transition' ? ' active' : ''}`,
          onClick: () => onChange('transition')
        },
        'Transition'
      )
    ),
    React.createElement(
      'div',
      { className: 'zone-description' },
      value === 'southern' 
        ? 'Longer growing season (~300 days/year)'
        : 'Shorter growing season (~240 days/year)'
    )
  );
}

// Main App Component with enhanced interactivity
function App() {
  const [gangs, setGangs] = React.useState(4);
  const [hoursPerDay, setHoursPerDay] = React.useState(3);
  const [gasPrice, setGasPrice] = React.useState(2.01);
  const [hourlyWage, setHourlyWage] = React.useState(10.35);
  const [climateZone, setClimateZone] = React.useState('southern');
  
  // Calculate results with memoization
  const results = React.useMemo(() => {
    const operatingDays = OPERATING_DAYS[climateZone];
    const annualHours = hoursPerDay * operatingDays;
    
    // Calculate robotic costs
    const robotDepreciation = ROBOT_BASE_COST / ROBOT_DEPRECIATION_YEARS;
    const robotElectricity = ROBOT_ELECTRICITY_HOURLY * annualHours;
    const roboticAnnualCost = robotDepreciation + ROBOT_MAINTENANCE + robotElectricity;
    
    // Calculate traditional costs
    const totalEquipmentCost = (gangs * TRADITIONAL_GANG_COST) + UTV_COST;
    const equipmentDepreciation = totalEquipmentCost / TRADITIONAL_DEPRECIATION_YEARS;
    const equipmentMaintenance = totalEquipmentCost * TRADITIONAL_MAINTENANCE_PERCENT;
    const gasUsage = TRADITIONAL_GAS_HOURLY * annualHours * gasPrice;
    const laborCost = hourlyWage * annualHours;
    const traditionalAnnualCost = equipmentDepreciation + equipmentMaintenance + gasUsage + laborCost;
    
    // Calculate savings and ROI
    const annualSavings = traditionalAnnualCost - roboticAnnualCost;
    const roiPeriod = annualSavings > 0 ? ROBOT_BASE_COST / annualSavings : 0;
    
    return {
      roboticAnnualCost,
      traditionalAnnualCost,
      annualSavings,
      roiPeriod
    };
  }, [gangs, hoursPerDay, gasPrice, hourlyWage, climateZone]);
  
  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement('h1', null, 'Robotic Ball Picker ROI Calculator'),
    
    React.createElement(
      'div',
      { className: 'input-section' },
      React.createElement(ClimateSelector, {
        value: climateZone,
        onChange: setClimateZone
      }),
      React.createElement(Slider, {
        label: "Number of Gangs",
        min: 1,
        max: 5,
        value: gangs,
        step: 1,
        onChange: setGangs,
        unit: "Gangs",
        description: "How many Gangs do you currently use",
        minLabel: "1 Gang",
        maxLabel: "5 Gangs"
      }),
      React.createElement(Slider, {
        label: "Hours per Day",
        min: 0,
        max: 14,
        value: hoursPerDay,
        step: 1,
        onChange: setHoursPerDay,
        unit: "Hours",
        description: "How Many Hours per Day do You Pick",
        minLabel: "0 Hours",
        maxLabel: "14 Hours"
      }),
      React.createElement(Slider, {
        label: "Gas Price",
        min: 0,
        max: 8,
        value: gasPrice,
        step: 0.01,
        onChange: setGasPrice,
        unit: "$",
        description: "Cost of Gas Per Gallon",
        minLabel: "$0",
        maxLabel: "$8"
      }),
      React.createElement(Slider, {
        label: "Hourly Wage",
        min: 0,
        max: 42.5,
        value: hourlyWage,
        step: 0.05,
        onChange: setHourlyWage,
        unit: "$",
        description: "How Much does The Employee Make Per Hour",
        minLabel: "$0",
        maxLabel: "$42.5"
      }),
      React.createElement(Disclaimer)
    ),
    
    React.createElement(
      'div',
      { className: 'result-section' },
      React.createElement(ResultItem, {
        label: 'Robotic Annual Cost',
        value: `$${formatCurrency(results.roboticAnnualCost)}`,
        isSubLabel: true
      }),
      React.createElement(ResultItem, {
        label: 'Traditional Annual Cost',
        value: `$${formatCurrency(results.traditionalAnnualCost)}`,
        isSubLabel: true
      }),
      React.createElement(ResultItem, {
        label: 'Savings Per Year',
        value: `$${formatCurrency(results.annualSavings)}`,
        isSavings: true
      }),
      React.createElement(ResultItem, {
        label: 'ROI Period (Years)',
        value: formatCurrency(results.roiPeriod)
      }),
      React.createElement(
        'a',
        {
          className: 'cta-button',
          href: 'https://www.knoxbots.com/contact',
          target: '_blank',
          rel: 'noopener noreferrer'
        },
        'GET STARTED'
      )
    )
  );
} 