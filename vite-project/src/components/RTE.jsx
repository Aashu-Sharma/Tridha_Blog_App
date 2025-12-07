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
              
              // Paste configuration
              paste_as_text: false, // Changed to false to allow processing
              paste_preprocess: function(plugin, args) {
                // Replace HTML entities with regular characters
                let content = args.content;
                
                // Replace common Word entities
                content = content.replace(/&rsquo;/g, "'");
                content = content.replace(/&lsquo;/g, "'");
                content = content.replace(/&rdquo;/g, '"');
                content = content.replace(/&ldquo;/g, '"');
                content = content.replace(/&ndash;/g, '–');
                content = content.replace(/&mdash;/g, '—');
                content = content.replace(/&nbsp;/g, ' ');
                content = content.replace(/&hellip;/g, '...');
                
                // Remove Word-specific markup
                content = content.replace(/<o:p><\/o:p>/g, '');
                content = content.replace(/<\/?(o:p|w:|m:|v:)[^>]*>/g, '');
                
                args.content = content;
              },
              
              paste_postprocess: function(plugin, args) {
                // Additional cleanup after paste
                const node = args.node;
                
                // Remove Word classes
                const elements = node.querySelectorAll('[class^="Mso"]');
                elements.forEach(el => {
                  el.removeAttribute('class');
                });
                
                // Clean up styles
                const styledElements = node.querySelectorAll('[style]');
                styledElements.forEach(el => {
                  el.removeAttribute('style');
                });
              },
              
              entity_encoding: 'raw', // Prevent entity encoding
              entities: '160,nbsp', // Only encode nbsp if needed
              
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
