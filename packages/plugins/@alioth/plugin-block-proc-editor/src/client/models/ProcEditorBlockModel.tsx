/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CreateFormModel, EditFormModel, DetailsBlockModel } from '@nocobase/client';
import { tExpr } from '../locale';

export class ProcEditorCreateModel extends CreateFormModel {}

ProcEditorCreateModel.define({
  label: tExpr('Proc editor form (Add new)'),
  searchable: true,
  searchPlaceholder: tExpr('Search'),
  createModelOptions: {
    subModels: {
      grid: {
        use: 'FormGridModel',
      },
    },
  },
});

export class ProcEditorEditModel extends EditFormModel {}

ProcEditorEditModel.define({
  label: tExpr('Proc editor form (Edit)'),
  searchable: true,
  searchPlaceholder: tExpr('Search'),
  createModelOptions: {
    subModels: {
      grid: {
        use: 'FormGridModel',
      },
    },
  },
});

export class ProcEditorDetailsBlockModel extends DetailsBlockModel {}

ProcEditorDetailsBlockModel.define({
  label: tExpr('Proc editor details'),
  searchable: true,
  searchPlaceholder: tExpr('Search'),
  createModelOptions: {
    subModels: {
      grid: {
        use: 'DetailsGridModel',
      },
    },
  },
});

//   get resource() {
//     return super.resource as MultiRecordResource;
//   }

//   onInit(options: any): void {
//     super.onInit(options);
//     this.resource.setRequestParameters({
//       paginate: false,
//       sort: this.props.sortBy || [],
//     });
//   }

//   createResource() {
//     return this.context.createResource(MultiRecordResource);
//   }

//   renderComponent() {
//     const { vHeight } = this.props;
//     const data = this.resource?.getData() || [];

//     return React.createElement(
//       'div',
//       {
//         style: {
//           width: '100%',
//           height: vHeight || '100%',
//           backgroundColor: '#f5f5f5',
//           border: '1px solid #e0e0e0',
//           position: 'relative',
//         },
//       },
//       React.createElement('div', {
//         style: {
//           width: '100%',
//           height: '100%',
//           backgroundImage: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
//           backgroundSize: '20px 20px',
//         },
//       }),
//     );
//   }
// }
// ProcEditorBlockModel.registerFlow({
//   key: 'procEditorSettings',
//   steps: {
//     dataScope: {
//       use: 'dataScope',
//       title: tExpr('Data scope'),
//     },
//     vHeight: {
//       title: tExpr('Height'),
//       uiSchema(ctx) {
//         return {
//           vHeight: {
//             'x-component': 'Input',
//             'x-decorator': 'FormItem',
//             default: '600px',
//           },
//         };
//       },
//       async handler(ctx, params) {
//         ctx.model.setProps({ vHeight: params.vHeight || '600px' });
//       },
//     },
//   },
// });
