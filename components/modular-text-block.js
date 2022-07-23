import BlockContent from '@sanity/block-content-to-react'

export default function ModularTextBlock({ text }) {
  return (
    <div className="max-w-[800px] content">
      <BlockContent serializers={{ container: ({ children }) => children }} blocks={text} />
    </div>
  )
}