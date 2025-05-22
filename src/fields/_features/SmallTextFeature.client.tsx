'use client'

import { ElementFormatType, type FeatureProvider } from '@payloadcms/richtext-lexical'
import { $createParagraphNode, $getSelection, $setBlocksType } from 'lexical'

export const SmallTextFeature = (): FeatureProvider => {
  return {
    key: 'small-text',
    plugins: [],
    nodes: [],
    props: {
      blockPicker: {
        smallText: {
          label: 'Small Text',
          icon: 'T',
          isEnabled: () => true,
          onClick: () => {
            $setBlocksType($createParagraphNode)
            const selection = $getSelection()
            if (selection?.getNodes) {
              for (const node of selection.getNodes()) {
                if ('$setFormat' in node) {
                  node.setFormat('small' as ElementFormatType)
                }
              }
            }
          },
        },
      },
    },
  }
}
