import { Form } from '../types';

export const forms: Form[] = [
  {
    id: 'form1',
    title: 'Building Fire Safety Certificate',
    description: 'This form is required for certifying the fire safety measures in your building.',
    fields: [
      {
        id: 'buildingName',
        name: 'buildingName',
        label: 'Building Name',
        type: 'text',
        required: true,
        placeholder: 'Enter building name'
      },
      {
        id: 'buildingAddress',
        name: 'buildingAddress',
        label: 'Building Address',
        type: 'textarea',
        required: true,
        placeholder: 'Enter complete building address'
      },
      {
        id: 'buildingType',
        name: 'buildingType',
        label: 'Building Type',
        type: 'select',
        required: true,
        options: [
          { value: 'residential', label: 'Residential' },
          { value: 'commercial', label: 'Commercial' },
          { value: 'industrial', label: 'Industrial' },
          { value: 'mixed', label: 'Mixed Use' }
        ]
      },
      {
        id: 'buildingHeight',
        name: 'buildingHeight',
        label: 'Building Height (in meters)',
        type: 'text',
        required: true,
        placeholder: 'Enter building height'
      },
      {
        id: 'buildingArea',
        name: 'buildingArea',
        label: 'Building Area (in sq. meters)',
        type: 'text',
        required: true,
        placeholder: 'Enter building area'
      },
      {
        id: 'occupancyType',
        name: 'occupancyType',
        label: 'Occupancy Type',
        type: 'select',
        required: true,
        options: [
          { value: 'residential', label: 'Residential' },
          { value: 'business', label: 'Business' },
          { value: 'mercantile', label: 'Mercantile' },
          { value: 'industrial', label: 'Industrial' },
          { value: 'storage', label: 'Storage' },
          { value: 'assembly', label: 'Assembly' },
          { value: 'educational', label: 'Educational' },
          { value: 'institutional', label: 'Institutional' }
        ]
      },
      {
        id: 'ownerName',
        name: 'ownerName',
        label: 'Owner Name',
        type: 'text',
        required: true,
        placeholder: 'Enter owner name'
      },
      {
        id: 'ownerContact',
        name: 'ownerContact',
        label: 'Owner Contact Number',
        type: 'text',
        required: true,
        placeholder: 'Enter owner contact number'
      },
      {
        id: 'declaration',
        name: 'declaration',
        label: 'Declaration',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'agree', label: 'I hereby declare that the information provided is true and correct to the best of my knowledge.' }
        ]
      }
    ]
  },
  {
    id: 'form2',
    title: 'Fire Safety Equipment Verification',
    description: 'This form is for verifying the fire safety equipment installed in your building.',
    fields: [
      {
        id: 'buildingName',
        name: 'buildingName',
        label: 'Building Name',
        type: 'text',
        required: true,
        placeholder: 'Enter building name'
      },
      {
        id: 'fireExtinguishers',
        name: 'fireExtinguishers',
        label: 'Fire Extinguishers',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'fireExtinguishersCount',
        name: 'fireExtinguishersCount',
        label: 'Number of Fire Extinguishers',
        type: 'text',
        required: true,
        placeholder: 'Enter number of fire extinguishers'
      },
      {
        id: 'fireAlarmSystem',
        name: 'fireAlarmSystem',
        label: 'Fire Alarm System',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'sprinklerSystem',
        name: 'sprinklerSystem',
        label: 'Sprinkler System',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'emergencyExits',
        name: 'emergencyExits',
        label: 'Emergency Exits',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'emergencyExitsCount',
        name: 'emergencyExitsCount',
        label: 'Number of Emergency Exits',
        type: 'text',
        required: true,
        placeholder: 'Enter number of emergency exits'
      },
      {
        id: 'lastMaintenanceDate',
        name: 'lastMaintenanceDate',
        label: 'Last Maintenance Date',
        type: 'date',
        required: true
      },
      {
        id: 'maintenanceCompany',
        name: 'maintenanceCompany',
        label: 'Maintenance Company',
        type: 'text',
        required: true,
        placeholder: 'Enter maintenance company name'
      },
      {
        id: 'declaration',
        name: 'declaration',
        label: 'Declaration',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'agree', label: 'I hereby declare that the information provided is true and correct to the best of my knowledge.' }
        ]
      }
    ]
  },
  {
    id: 'form3',
    title: 'Emergency Evacuation Plan',
    description: 'This form is for submitting the emergency evacuation plan for your building.',
    fields: [
      {
        id: 'buildingName',
        name: 'buildingName',
        label: 'Building Name',
        type: 'text',
        required: true,
        placeholder: 'Enter building name'
      },
      {
        id: 'evacuationPlanExists',
        name: 'evacuationPlanExists',
        label: 'Evacuation Plan Exists',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'evacuationPlanFile',
        name: 'evacuationPlanFile',
        label: 'Upload Evacuation Plan',
        type: 'file',
        required: true
      },
      {
        id: 'assemblyPoints',
        name: 'assemblyPoints',
        label: 'Number of Assembly Points',
        type: 'text',
        required: true,
        placeholder: 'Enter number of assembly points'
      },
      {
        id: 'assemblyPointsDescription',
        name: 'assemblyPointsDescription',
        label: 'Description of Assembly Points',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the assembly points'
      },
      {
        id: 'evacuationDrillsFrequency',
        name: 'evacuationDrillsFrequency',
        label: 'Evacuation Drills Frequency',
        type: 'select',
        required: true,
        options: [
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'biannually', label: 'Biannually' },
          { value: 'annually', label: 'Annually' }
        ]
      },
      {
        id: 'lastDrillDate',
        name: 'lastDrillDate',
        label: 'Last Drill Date',
        type: 'date',
        required: true
      },
      {
        id: 'emergencyContactName',
        name: 'emergencyContactName',
        label: 'Emergency Contact Name',
        type: 'text',
        required: true,
        placeholder: 'Enter emergency contact name'
      },
      {
        id: 'emergencyContactNumber',
        name: 'emergencyContactNumber',
        label: 'Emergency Contact Number',
        type: 'text',
        required: true,
        placeholder: 'Enter emergency contact number'
      },
      {
        id: 'declaration',
        name: 'declaration',
        label: 'Declaration',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'agree', label: 'I hereby declare that the information provided is true and correct to the best of my knowledge.' }
        ]
      }
    ]
  },
  {
    id: 'form4',
    title: 'Fire Safety Compliance Declaration',
    description: 'This form is for declaring compliance with fire safety regulations.',
    fields: [
      {
        id: 'buildingName',
        name: 'buildingName',
        label: 'Building Name',
        type: 'text',
        required: true,
        placeholder: 'Enter building name'
      },
      {
        id: 'complianceStandard',
        name: 'complianceStandard',
        label: 'Compliance Standard',
        type: 'select',
        required: true,
        options: [
          { value: 'nbc2016', label: 'National Building Code 2016' },
          { value: 'nfpa101', label: 'NFPA 101: Life Safety Code' },
          { value: 'is2189', label: 'IS 2189: Selection, Installation and Maintenance of Automatic Fire Detection and Alarm System' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        id: 'otherComplianceStandard',
        name: 'otherComplianceStandard',
        label: 'Other Compliance Standard',
        type: 'text',
        required: false,
        placeholder: 'Specify other compliance standard'
      },
      {
        id: 'certificationAuthority',
        name: 'certificationAuthority',
        label: 'Certification Authority',
        type: 'text',
        required: true,
        placeholder: 'Enter certification authority'
      },
      {
        id: 'certificationDate',
        name: 'certificationDate',
        label: 'Certification Date',
        type: 'date',
        required: true
      },
      {
        id: 'certificationValidity',
        name: 'certificationValidity',
        label: 'Certification Validity',
        type: 'select',
        required: true,
        options: [
          { value: '1year', label: '1 Year' },
          { value: '2years', label: '2 Years' },
          { value: '3years', label: '3 Years' },
          { value: '5years', label: '5 Years' }
        ]
      },
      {
        id: 'certificationFile',
        name: 'certificationFile',
        label: 'Upload Certification Document',
        type: 'file',
        required: true
      },
      {
        id: 'declaration',
        name: 'declaration',
        label: 'Declaration',
        type: 'checkbox',
        required: true,
        options: [
          { value: 'agree', label: 'I hereby declare that the information provided is true and correct to the best of my knowledge.' }
        ]
      }
    ]
  }
];