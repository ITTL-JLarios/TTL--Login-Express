import importExportFeature from '@adminjs/import-export';
import { AdminJSOptions } from 'adminjs';

import componentLoader from './component-loader.js';
import { Users } from '../models/users.js';
import { Events } from '../models/events.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    Users,
    {
      resource: Events,
      features: [
        importExportFeature({ componentLoader })
      ],
    },
  ],
  databases: [],
  branding: {
    companyName: 'Total Transport Logistics',
    logo: 'https://static.wixstatic.com/media/81525e_e5a741858f5349c7a8f2c594ffdb4680~mv2.jpg/v1/fill/w_220,h_98,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Original_edited.jpg'
  }
};

export default options;
