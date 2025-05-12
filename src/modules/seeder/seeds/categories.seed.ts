export type categoriesSeedType = {
    name: string,
    description : string,
    children?: categoriesSeedType[] ,
}
export const categoriesSeed: categoriesSeedType[] = [
    {
        name: 'Mechanical Maintenance',
        description: 'Maintenance related to mechanical components and systems',
        children: [
            {
                name: 'Hydraulic Systems',
                description:
                    'Maintenance of fluid power systems that use pressurized liquids',
                children: [
                    {
                        name: 'Pumps',
                        description:
                            'Maintenance of devices that move fluids by mechanical action',
                    },
                    {
                        name: 'Valves',
                        description: 'Maintenance of devices that regulate fluid flow',
                    },
                    {
                        name: 'Cylinders',
                        description:
                            'Maintenance of mechanical actuators that convert pressure to linear motion',
                    },
                ],
            },
            {
                name: 'Pneumatic Systems',
                description: 'Maintenance of systems that use compressed air or gas',
                children: [
                    {
                        name: 'Compressors',
                        description: 'Maintenance of devices that compress air or gas',
                    },
                    {
                        name: 'Air Treatment',
                        description: 'Maintenance of filters, regulators, and lubricators',
                    },
                ],
            },
            {
                name: 'Mechanical Components',
                description: 'Maintenance of mechanical parts and assemblies',
                children: [
                    {
                        name: 'Bearings',
                        description:
                            'Maintenance of components that constrain relative motion and reduce friction',
                    },
                    {
                        name: 'Gears',
                        description:
                            'Maintenance of toothed mechanical parts that transmit rotational force',
                    },
                    {
                        name: 'Belt and Chain Drives',
                        description:
                            'Maintenance of power transmission systems using belts or chains',
                    },
                ],
            },
        ],
    },
    {
        name: 'Electrical Maintenance',
        description: 'Maintenance related to electrical systems and components',
        children: [
            {
                name: 'Power Systems',
                description:
                    'Maintenance of electrical power generation and distribution systems',
                children: [
                    {
                        name: 'Transformers',
                        description:
                            'Maintenance of electrical devices that transfer energy between circuits',
                    },
                    {
                        name: 'Switchgear',
                        description:
                            'Maintenance of devices that control, protect and isolate electrical equipment',
                    },
                    {
                        name: 'UPS Systems',
                        description: 'Maintenance of uninterruptible power supply systems',
                    },
                ],
            },
            {
                name: 'Control Systems',
                description: 'Maintenance of systems that manage equipment operation',
                children: [
                    {
                        name: 'PLC',
                        description: 'Maintenance of programmable logic controllers',
                    },
                    {
                        name: 'HMI',
                        description: 'Maintenance of human-machine interfaces',
                    },
                    {
                        name: 'VFD',
                        description: 'Maintenance of variable frequency drives',
                    },
                ],
            },
            {
                name: 'Electrical Components',
                description: 'Maintenance of electrical parts',
                children: [
                    {
                        name: 'Motors',
                        description: 'Maintenance of electric motors',
                    },
                    {
                        name: 'Generators',
                        description: 'Maintenance of electrical generators',
                    },
                    {
                        name: 'Wiring',
                        description: 'Maintenance of electrical wiring and connections',
                    },
                ],
            },
        ],
    },
    {
        name: 'HVAC Maintenance',
        description:
            'Maintenance of heating, ventilation, and air conditioning systems',
        children: [
            {
                name: 'Heating Systems',
                description: 'Maintenance of equipment that generates heat',
                children: [
                    {
                        name: 'Boilers',
                        description: 'Maintenance of vessels in which fluid is heated',
                    },
                    {
                        name: 'Furnaces',
                        description:
                            'Maintenance of devices used for high-temperature heating',
                    },
                    {
                        name: 'Heat Pumps',
                        description: 'Maintenance of devices that transfer heat energy',
                    },
                ],
            },
            {
                name: 'Cooling Systems',
                description: 'Maintenance of equipment that removes heat',
                children: [
                    {
                        name: 'Chillers',
                        description:
                            'Maintenance of machines that remove heat from liquids',
                    },
                    {
                        name: 'Air Conditioners',
                        description: 'Maintenance of systems that cool and dehumidify air',
                    },
                    {
                        name: 'Cooling Towers',
                        description: 'Maintenance of heat rejection devices',
                    },
                ],
            },
            {
                name: 'Ventilation',
                description: 'Maintenance of equipment that moves or replaces air',
                children: [
                    {
                        name: 'Fans',
                        description: 'Maintenance of devices that create air flow',
                    },
                    {
                        name: 'Ductwork',
                        description: 'Maintenance of passages used for air distribution',
                    },
                    {
                        name: 'Air Handlers',
                        description: 'Maintenance of units that regulate and circulate air',
                    },
                ],
            },
        ],
    },
    {
        name: 'Plumbing Maintenance',
        description: 'Maintenance of water and fluid systems',
        children: [
            {
                name: 'Water Supply',
                description: 'Maintenance of systems that provide water',
                children: [
                    {
                        name: 'Pumps (Water)',
                        description: 'Maintenance of water pumps',
                    },
                    {
                        name: 'Pipes',
                        description: 'Maintenance of water pipes',
                    },
                    {
                        name: 'Filters',
                        description: 'Maintenance of water filtration systems',
                    },
                ],
            },
            {
                name: 'Drainage',
                description: 'Maintenance of systems that remove water',
                children: [
                    {
                        name: 'Drains',
                        description: 'Maintenance of water drainage points',
                    },
                    {
                        name: 'Sewage',
                        description: 'Maintenance of waste water systems',
                    },
                ],
            },
            {
                name: 'Fixtures',
                description: 'Maintenance of plumbing fixtures',
                children: [
                    {
                        name: 'Faucets',
                        description: 'Maintenance of valves controlling water release',
                    },
                    {
                        name: 'Toilets',
                        description: 'Maintenance of sanitation fixtures',
                    },
                    {
                        name: 'Sinks',
                        description: 'Maintenance of basins for water',
                    },
                ],
            },
        ],
    },
    {
        name: 'Safety Systems',
        description: 'Maintenance of systems designed for safety and emergency',
        children: [
            {
                name: 'Fire Protection',
                description:
                    'Maintenance of systems for fire detection and suppression',
                children: [
                    {
                        name: 'Sprinklers',
                        description: 'Maintenance of automatic fire suppression systems',
                    },
                    {
                        name: 'Alarms',
                        description: 'Maintenance of fire detection and alert systems',
                    },
                    {
                        name: 'Extinguishers',
                        description: 'Maintenance of portable fire fighting equipment',
                    },
                ],
            },
            {
                name: 'Emergency Systems',
                description: 'Maintenance of systems for emergency situations',
                children: [
                    {
                        name: 'Exit Signs',
                        description: 'Maintenance of emergency exit indicators',
                    },
                    {
                        name: 'Backup Power',
                        description: 'Maintenance of emergency power systems',
                    },
                    {
                        name: 'Emergency Lighting',
                        description: 'Maintenance of lighting systems for power failures',
                    },
                ],
            },
        ],
    },
];
