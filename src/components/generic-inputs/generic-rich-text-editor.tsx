import { useId } from "react"
import StarterKit from "@tiptap/starter-kit"
import { Field } from "@astryxdesign/core/Field"
import { Placeholder } from "@tiptap/extensions"
import { HStack } from "@astryxdesign/core/HStack"
import { Divider } from "@astryxdesign/core/Divider"
import { EditorContent, useEditor } from "@tiptap/react"
import { IconButton } from "@astryxdesign/core/IconButton"

import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  CodeBlockIcon,
  CodeIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  MinusIcon,
  QuotesIcon,
  TextBIcon,
  TextHOneIcon,
  TextHThreeIcon,
  TextHTwoIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
} from "@phosphor-icons/react"

import { useFieldContext } from "./field-context"
import { useTranslation } from "react-i18next"

export type GenericRichTextEditorProps = {
  id?: string
  label: string
  description?: string
  isRequired?: boolean
  isDisabled?: boolean
  placeholder?: string
}

const dividerFill = {
  alignSelf: "stretch",
  height: "auto",
}
export function GenericRichTextEditor({
  label,
  description,
  isRequired,
  isDisabled = false,
  id: propId,
  placeholder,
}: GenericRichTextEditorProps) {
  const { t } = useTranslation()
  const field = useFieldContext<string>()
  const autoId = useId()
  const id = propId || autoId
  const error = field.state.meta.errors.at(0)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    immediatelyRender: false,
    content: field.state.value || "",
    onUpdate: ({ editor: currentEditor }) => {
      const html = currentEditor.isEmpty ? "" : currentEditor.getHTML()
      field.setValue(html)
    },
    editable: !isDisabled,
    editorProps: {
      attributes: {
        class: "child-tiptap-container",
      },
    },
  })

  if (!editor) return null

  return (
    <Field
      inputID={id}
      label={label}
      description={description}
      isRequired={isRequired}
      status={error ? { type: "error", message: t(error.message) } : undefined}
    >
      <div
        data-status={error ? "error" : "default"}
        className={"parent-tiptap-container"}
      >
        <HStack
          gap={1}
          paddingBlock={1}
          style={{
            background: "var(--color-background-body)",
            borderRadius: "var(--radius-element) var(--radius-element) 0 0",
          }}
        >
          {/* Bold */}
          <IconButton
            icon={<TextBIcon />}
            label="Bold"
            variant={editor.isActive("bold") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          {/* Italic */}
          <IconButton
            icon={<TextItalicIcon />}
            label="Italic"
            variant={editor.isActive("italic") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          {/* Strikethrough */}
          <IconButton
            icon={<TextStrikethroughIcon />}
            label="Strikethrough"
            variant={editor.isActive("strike") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          />
          {/* Code */}
          <IconButton
            icon={<CodeIcon />}
            label="Code"
            variant={editor.isActive("code") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleCode().run()}
          />

          <Divider orientation="vertical" style={dividerFill} />

          {/* Heading 1 */}
          <IconButton
            icon={<TextHOneIcon />}
            label="Heading 1"
            variant={
              editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          />
          {/* Heading 2 */}
          <IconButton
            icon={<TextHTwoIcon />}
            label="Heading 2"
            variant={
              editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          />
          {/* Heading 3 */}
          <IconButton
            icon={<TextHThreeIcon />}
            label="Heading 3"
            variant={
              editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          />

          <Divider orientation="vertical" style={dividerFill} />

          {/* Bullet List */}
          <IconButton
            icon={<ListBulletsIcon />}
            label="Bullet List"
            variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          {/* Numbered List */}
          <IconButton
            icon={<ListNumbersIcon />}
            label="Numbered List"
            variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          {/* Blockquote */}
          <IconButton
            icon={<QuotesIcon />}
            label="Blockquote"
            variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />
          {/* Code Block */}
          <IconButton
            icon={<CodeBlockIcon />}
            label="Code Block"
            variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          />
          {/* Horizontal Rule */}
          <IconButton
            icon={<MinusIcon />}
            label="Horizontal Divider"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />

          <Divider orientation="vertical" style={dividerFill} />

          {/* Undo */}
          <IconButton
            icon={<ArrowCounterClockwiseIcon />}
            label="Undo"
            isDisabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          />
          {/* Redo */}
          <IconButton
            icon={<ArrowClockwiseIcon />}
            label="Redo"
            isDisabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          />
        </HStack>
        <EditorContent id={id} editor={editor} />
      </div>
    </Field>
  )
}
