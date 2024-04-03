import { EditorState, Modifier } from 'draft-js';
import { useState } from 'react';
import { BsFillBagFill } from 'react-icons/bs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type ReplacementsProps = {
  onChange?: (editorState: EditorState) => void;
  editorState: EditorState;
};

export const Replacements = ({ onChange, editorState }: ReplacementsProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const addPlaceholder = (placeholder: string): void => {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      placeholder,
      editorState.getCurrentInlineStyle(),
    );
    const result = EditorState.push(
      editorState,
      contentState,
      'insert-characters',
    );
    if (onChange) {
      onChange(result);
    }
  };

  const placeholderOptions = [
    { key: 'company', value: '{{company}}', text: 'Company' },
    { key: 'address', value: '{{address}}', text: 'Address' },
    { key: 'zip', value: '{{zip}}', text: 'Zip' },
    { key: 'city', value: '{{city}}', text: 'City' },
  ];

  return (
    <div
      onClick={() => setOpen(!open)}
      className="rdw-block-wrapper"
      aria-label="rdw-block-control"
      role="button"
      tabIndex={0}
    >
      <div
        className="rdw-dropdown-wrapper rdw-block-dropdown"
        aria-label="rdw-dropdown"
        style={{ width: 180 }}
      >
        <div className="rdw-dropdown-selectedtext">
          <span>Міста</span>
          <div className={`rdw-dropdown-caretto${open ? 'close' : 'open'}`} />
        </div>
        <ul
          className={`rdw-dropdown-optionwrapper ${
            open ? '' : 'placeholder-ul'
          }`}
        >
          {placeholderOptions.map(item => (
            <li
              onClick={() => addPlaceholder(item.value)}
              key={item.value}
              className="rdw-dropdownoption-default placeholder-li"
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
