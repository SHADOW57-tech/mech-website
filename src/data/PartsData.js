import Sterring1 from "../images/Sterring-1.1m-1.jpg";
import Sterring2 from "../images/Sterring-1m1.jpg";
import Sterring3 from "../images/Sterring1.1m2.jpg";
import Sterring4 from "../images/Sterring1.1m2.jpg";
import AmbulanceLight from "../images/Ambiance-light1.jpg";
import frontGLEupgrade from "../images/front-GLE-upgrade.jpg";
import Headlamp1 from "../images/E350-2014-headlamp-750k.jpg";
import Headlamp2 from "../images/GLA-2019-head-light-800k.jpg";
import Airfilter from "../images/air-filter.png"
import Oilfilter from "../images/oil-filter.png"
import Battery from "../images/battery.png"
import Wipperblade from "../images/wipper-blade.png"
import Brakepad from "../images/break-pad.png"
import Sparkplug from "../images/spark-plug.png"
import Fuelpump from "../images/fuel-pump.png"


 const allParts = [
    { id: 1, name: "Brake Pads", price: 12000, image: Brakepad, type: "Brakes" },
    {id: 2, name: "steering wheel", price: 1000000, image:Sterring1, type: "Interior"},
    {id: 51, name: "steering wheel", price: 1100000, image:Sterring2, type: "interor"},
    {id: 52, name: "steering wheel", price: 1000000, image:Sterring3, type: "interior"},
    {id: 53, name: "steering wheel", price: 1100000, image:Sterring4, type: "interior"},
    {id: 54, name: "Ambiance light", desc:"for GLC/C300 2015/E350 2017/CLA", price: 650000, image:AmbulanceLight, type: "interior"},
    {id:55, name:"front GLE upgrade", price:1000000, image:frontGLEupgrade, type: "exterior"},
    { id: 56, name: "Oil Filter", price: 5500, image:Oilfilter, type: "Engine" },
    {id: 57, name: "E350 2014 headlamp 750k", price:750000, image:Headlamp1},
    {id: 58, name: "GLA 2019 head light 800k", price:800000, image:Headlamp2},
    { id: 3, name: "Air Filter", price: 6200, image: Airfilter, type: "Engine" },
    { id: 4, name: "Battery", price: 45000, image: Battery, type: "Electrical" },
    { id: 5, name: "Wiper Blades", price: 3000, image: Wipperblade, type: "Exterior" },
    { id: 6, name: "Spark Plug", price: 2800, image: Sparkplug, type: "Engine" },
    { id: 7, name: "Fuel Pump", price: 18000, image: Fuelpump, type: "Fuel System" },
    { id: 8, name: "Timing Belt", price: 10000, image: "/images/timing-belt.jpg", type: "Engine" },
    { id: 9, name: "Radiator", price: 25000, image: "/images/radiator.jpg", type: "Cooling System" },
    { id: 10, name: "Headlight Bulb", price: 1500, image: "/images/headlight-bulb.jpg", type: "Electrical" },
    { id: 11, name: "Tail Light Bulb", price: 1200, image: "/images/tail-light-bulb.jpg", type: "Electrical" },
    { id: 12, name: "Brake Fluid", price: 2500, image: "/images/brake-fluid.jpg", type: "Brakes" },
    { id: 13, name: "Coolant", price: 3000, image: "/images/coolant.jpg", type: "Cooling System" },
    { id: 14, name: "Transmission Fluid", price: 4000, image: "/images/transmission-fluid.jpg", type: "Transmission" },
    { id: 15, name: "Power Steering Fluid", price: 3500, image: "/images/power-steering-fluid.jpg", type: "Steering" },
    { id: 16, name: "Clutch Kit", price: 20000, image: "/images/clutch-kit.jpg", type: "Transmission" },
    { id: 17, name: "Exhaust System", price: 30000, image: "/images/exhaust-system.jpg", type: "Exhaust" },
    { id: 18, name: "Suspension Strut", price: 15000, image: "/images/suspension-strut.jpg", type: "Suspension" },
    { id: 19, name: "Wheel Bearing", price: 7000, image: "/images/wheel-bearing.jpg", type: "Wheels" },
    { id: 20, name: "Tire Pressure Sensor", price: 4000, image: "/images/tire-pressure-sensor.jpg", type: "Wheels" },
    { id: 21, name: "Fuel Filter", price: 5000, image: "/images/fuel-filter.jpg", type: "Fuel System" },
    { id: 22, name: "Thermostat", price: 6000, image: "/images/thermostat.jpg", type: "Cooling System" },
    { id: 23, name: "CV Joint", price: 12000, image: "/images/cv-joint.jpg", type: "Drivetrain" },
    { id: 24, name: "Drive Belt", price: 8000, image: "/images/drive-belt.jpg", type: "Engine" },
    { id: 25, name: "Fuel Injector", price: 15000, image: "/images/fuel-injector.jpg", type: "Fuel System" },
    { id: 26, name: "Oxygen Sensor", price: 7000, image: "/images/oxygen-sensor.jpg", type: "Emissions" },
    { id: 27, name: "Mass Air Flow Sensor", price: 9000, image: "/images/mass-air-flow-sensor.jpg", type: "Engine" },
    { id: 28, name: "Ignition Coil", price: 5000, image: "/images/ignition-coil.jpg", type: "Electrical" },
    { id: 29, name: "Fuel Tank Cap", price: 2000, image: "/images/fuel-tank-cap.jpg", type: "Fuel System" },
    { id: 30, name: "Brake Rotor", price: 15000, image: "/images/brake-rotor.jpg", type: "Brakes" },
    { id: 31, name: "Shock Absorber", price: 18000, image: "/images/shock-absorber.jpg", type: "Suspension" },
    { id: 32, name: "Wheel Lug Nut", price: 500, image: "/images/wheel-lug-nut.jpg", type: "Wheels" },
    { id: 33, name: "Fuel Line", price: 4000, image: "/images/fuel-line.jpg", type: "Fuel System" },
    { id: 34, name: "Brake Caliper", price: 12000, image: "/images/brake-caliper.jpg", type: "Brakes" },
    { id: 35, name: "Steering Rack", price: 25000, image: "/images/steering-rack.jpg", type: "Steering" },
    { id: 36, name: "Differential Fluid", price: 3000, image: "/images/differential-fluid.jpg", type: "Drivetrain" },
    { id: 37, name: "Radiator Hose", price: 4000, image: "/images/radiator-hose.jpg", type: "Cooling System" },
    { id: 38, name: "Engine Mount", price: 8000, image: "/images/engine-mount.jpg", type: "Engine" },
    { id: 39, name: "Transmission Mount", price: 7000, image: "/images/transmission-mount.jpg", type: "Transmission" },
    { id: 40, name: "Exhaust Gasket", price: 2500, image: "/images/exhaust-gasket.jpg", type: "Exhaust" },
    { id: 41, name: "Fuel Pump Relay", price: 1500, image: "/images/fuel-pump-relay.jpg", type: "Electrical" },
    { id: 42, name: "Head Gasket", price: 20000, image: "/images/head-gasket.jpg", type: "Engine" },
    { id: 43, name: "Timing Chain", price: 18000, image: "/images/timing-chain.jpg", type: "Engine" },
    { id: 44, name: "Clutch Slave Cylinder", price: 6000, image: "/images/clutch-slave-cylinder.jpg", type: "Transmission" },
    { id: 45, name: "Clutch Master Cylinder", price: 7000, image: "/images/clutch-master-cylinder.jpg", type: "Transmission" },
    { id: 46, name: "Brake Light Switch", price: 2000, image: "/images/brake-light-switch.jpg", type: "Electrical" },
    { id: 47, name: "Turn Signal Relay", price: 1500, image: "/images/turn-signal-relay.jpg", type: "Electrical" },
    { id: 48, name: "ABS Sensor", price: 5000, image: "/images/abs-sensor.jpg", type: "Brakes" },
    { id: 49, name: "Wheel Speed Sensor", price: 4000, image: "/images/wheel-speed-sensor.jpg", type: "Wheels" },
    { id: 50, name: "Fuel Pressure Regulator", price: 8000, image: "/images/fuel-pressure-regulator.jpg", type: "Fuel System" },
  
  ];
  export default allParts;