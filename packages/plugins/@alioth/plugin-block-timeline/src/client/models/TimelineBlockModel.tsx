/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BlockSceneEnum, CollectionBlockModel } from '@nocobase/client';
import { MultiRecordResource } from '@nocobase/flow-engine';
import { Timeline } from 'antd';
import React from 'react';
import { tExpr } from '../locale';
import dayjs from 'dayjs';
import * as icons from '@ant-design/icons';

export class TimelineBlockModel extends CollectionBlockModel {
  static scene = BlockSceneEnum.many;

  get resource() {
    return super.resource as MultiRecordResource;
  }

  onInit(options: any): void {
    super.onInit(options);
    this.resource.setRequestParameters({
      paginate: false,
      sort: this.props.sortBy || [],
    });
  }

  createResource() {
    return this.context.createResource(MultiRecordResource);
  }

  renderComponent() {
    const { childrenField, labelField, viewMode, dotField, colorField, dateFormatField } = this.props;
    const data = this.resource?.getData() || [];
    console.log('TimelineBlockModel data:', data);
    const items = data.map((record) => ({
      children: childrenField ? record[childrenField] : 'No content',
      label: labelField ? dayjs(record[labelField]).format(dateFormatField || 'YYYY-MM-DD') : undefined,
      dot: dotField ? (icons[record[dotField]] ? React.createElement(icons[record[dotField]]) : undefined) : undefined,
      color: colorField ? record[colorField] : undefined,
    }));

    return <Timeline mode={viewMode} items={items} />;
  }
}

TimelineBlockModel.define({
  label: tExpr('Alioth.Timeline'),
});

TimelineBlockModel.registerFlow({
  key: 'timelineSettings',
  steps: {
    dataScope: {
      use: 'dataScope',
      title: tExpr('Data scope'),
    },
    viewMode: {
      title: tExpr('View mode'),
      uiSchema(ctx) {
        return {
          viewMode: {
            'x-component': 'Radio.Group',
            'x-decorator': 'FormItem',
            enum: [
              { label: tExpr('Alternate'), value: 'alternate' },
              { label: tExpr('Left'), value: 'left' },
              { label: tExpr('Right'), value: 'right' },
            ],
          },
        };
      },
      async handler(ctx, params) {
        ctx.model.setProps({ viewMode: params.viewMode });
      },
    },
    fieldMapping: {
      title: tExpr('Field mapping'),
      uiSchema(ctx) {
        const t = ctx.t;
        const collectionManager = ctx.dataSourceManager.getDataSource(ctx.dataSource.key).collectionManager;

        // 为每个字段类型配置独立的字段类型要求
        const childrenFieldOptions = collectionManager.getCollectionFieldsOptions(
          ctx.collection.name,
          null,
          ['input', 'select'],
          {
            dataSource: ctx.dataSource.key,
          },
        );

        const labelFieldOptions = collectionManager.getCollectionFieldsOptions(
          ctx.collection.name,
          null,
          ['datetime', 'updatedAt', 'createdAt'],
          {
            dataSource: ctx.dataSource.key,
          },
        );

        const dotFieldOptions = collectionManager.getCollectionFieldsOptions(ctx.collection.name, null, ['icon'], {
          dataSource: ctx.dataSource.key,
        });

        const colorFieldOptions = collectionManager.getCollectionFieldsOptions(ctx.collection.name, null, ['color'], {
          dataSource: ctx.dataSource.key,
        });
        console.log('timeline colorFieldOptions:', colorFieldOptions);
        return {
          childrenField: {
            title: tExpr('Content field'),
            required: true,
            enum: childrenFieldOptions.map((item) => ({ label: item.label, value: item.value })),
            'x-component': 'Select',
            'x-decorator': 'FormItem',
          },
          labelField: {
            title: tExpr('Title field'),
            enum: labelFieldOptions.map((item) => ({ label: item.label, value: item.value })),
            'x-component': 'Select',
            'x-decorator': 'FormItem',
          },
          dateFormatField: {
            title: tExpr('Date format'),
            enum: [
              { label: tExpr('YYYY-MM-DD HH:mm:ss'), value: 'YYYY-MM-DD HH:mm:ss' },
              { label: tExpr('YYYY-MM-DD'), value: 'YYYY-MM-DD' },
            ],
            'x-component': 'Select',
            'x-decorator': 'FormItem',
          },
          dotField: {
            title: tExpr('Icon field'),
            enum: dotFieldOptions.map((item) => ({ label: item.label, value: item.value })),
            'x-component': 'Select',
            'x-decorator': 'FormItem',
          },
          colorField: {
            title: tExpr('Color field'),
            enum: colorFieldOptions.map((item) => ({ label: item.label, value: item.value })),
            'x-component': 'Select',
            'x-decorator': 'FormItem',
          },
        };
      },
      async handler(ctx, params) {
        console.log(params);
        ctx.model.setProps({
          childrenField: params.childrenField,
          labelField: params.labelField,
          dotField: params.dotField,
          colorField: params.colorField,
          dateFormatField: params.dateFormatField,
        });
      },
    },
    sorting: {
      use: 'sortingRule',
      title: tExpr('Sorting rules'),
      async handler(ctx, params) {
        const sortArr = params.sort.map((item) => {
          return item.direction === 'desc' ? `-${item.field}` : item.field;
        });
        ctx.model.setProps({ sortBy: sortArr });

        if (ctx.model.resource) {
          ctx.model.resource.setRequestParameters({
            sort: sortArr,
          });
        }
      },
    },
  },
});
