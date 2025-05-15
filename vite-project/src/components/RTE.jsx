import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className="w-full">
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='qipeslsgeeiw9m904qhigd289tsml91c0v4n024c3n8taj7l'
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              selector: 'textarea',
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
                'paste',
                "nonbreaking",
                "visualchars"
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              paste_as_text: true,
              paste_auto_cleanup_on_paste: true,
              paste_remove_styles: true,
              paste_remove_styles_if_webkit: true,
              paste_merge_formats: false,
              paste_enable_default_filters: false,
              paste_strip_class_attributes: "all",
              paste_word_valid_elements: true,
              paste_tab_spaces: 2,
              visualchars_default_state: true,
              charmap_append: [
                [160, 'no-break space'],
                [173, 'soft hyphen'],
                [34, 'quotation mark'],
                [8217,"	RIGHT SINGLE QUOTATION MARK"],
                [8212, "EM DASH"],
                [8205, 'zero width joiner'],
                [8206, 'left-to-right mark'],
                [8207, 'right-to-left mark']
              ],
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}

export default RTE