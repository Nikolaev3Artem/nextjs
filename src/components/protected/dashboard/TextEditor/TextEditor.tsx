import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import debounce from '@mui/utils/debounce';
import clsx from 'clsx';
import cn from 'clsx';
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { IEditorText } from '@/interface/IEditorText';
// import {
// 	setEditorData,
// 	setEditorDataTwo
// } from "../../store/admin/about/EditorSlice"
// import { useAppDispatch } from "../../store/auth/redux"
import { Replacements } from './Replacements';
import Style from './texteditor.module.css';
import uk from './uk';
import { useLangContext } from '@/app/context';

const color_title = grey[700];
interface IEditorNumProps {
  data: number;
  titleOne?: string;
  titleTwo?: string;
  res: IEditorText[];
}

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(module => module.Editor),
  {
    ssr: false,
  },
);

function TextEditor({ data, titleOne, titleTwo, res }: IEditorNumProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const [textRaw, setTextRaw] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const onFocus = clsx({
    [Style.focus]: focus,
  });
  //   const dispatch = useAppDispatch();
  //   const { locale } = useRouter();
  const { selectLang } = useLangContext();
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  //   const debounced = debounce(html => {
  //     data && data === 1 ? dispatch(setEditorData(html)) : null;
  //     data && data === 2 ? dispatch(setEditorDataTwo(html)) : null;
  //   }, 1000);
  //   const verify = useCallback((html: string) => {
  //     debounced(html);
  //   }, []);

  //   useEffect(() => {
  //     if (editorState !== undefined) {
  //       verify(html());
  //     }
  //   }, [editorState]);

  useEffect(() => {
    if (editorState !== undefined) {
      const blocksFromHTML = convertFromHTML((res && res[0]?.text1) || '');
      const blocksFromHTML2 = convertFromHTML((res && res[0]?.text2) || '');
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
      );
      const contentState2 = ContentState.createFromBlockArray(
        blocksFromHTML2.contentBlocks,
      );
      const text = EditorState.createWithContent(contentState);
      const text2 = EditorState.createWithContent(contentState2);
      data && data === 1 ? setEditorState(text) : null;
      data && data === 2 ? setEditorState(text2) : null;
    }
  }, []);
  // console.log("State", editorState)

  const html = () => {
    if (rawContentState.blocks.length) {
      return draftToHtml(rawContentState);
    } else {
      return '';
    }
  };

  return (
    <Box className={Style.wrapper}>
      {data && data === 1 ? (
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '140%',
          }}
          mb={2}
          variant={'h4'}
          component={'h4'}
        >
          {titleOne}
        </Typography>
      ) : null}
      {data && data === 2 ? (
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '140%',
          }}
          mb={2}
          variant={'h4'}
          component={'h4'}
        >
          {titleTwo}
        </Typography>
      ) : null}
      <Editor
        toolbar={{
          options: [
            'inline',
            'blockType',
            'list',
            'textAlign',
            'colorPicker',
            'remove',
            'history',
          ],
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['unordered', 'ordered'],
          },
          textAlign: {
            inDropdown: true,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['left', 'center', 'right', 'justify'],
          },
          inline: {
            inDropdown: false,
            className: Style.inline,
            component: undefined,
            dropdownClassName: undefined,
            options: [
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'superscript',
              'subscript',
            ],
            bold: {
              className: Style.bold,
            },
            italic: {
              className: Style.bold,
            },
            underline: {
              className: Style.bold,
            },
          },
          blockType: {
            inDropdown: true,
            options: [
              'Normal',
              'H2',
              'H3',
              'H4',
              'H5',
              'H6',
              'Blockquote',
              'Code',
            ],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
        }}
        localization={{
          locale: selectLang,
          translations: selectLang === 'uk' ? uk : selectLang,
        }}
        // toolbarCustomButtons={[<Replacements editorState={editorState} />]}
        placeholder=" Введіть текст..."
        editorState={editorState}
        toolbarClassName={Style.text_editor_toolbar}
        wrapperClassName={Style.wrapper_editor}
        editorClassName={cn(onFocus, Style.text_editor_text)}
        onEditorStateChange={setEditorState}
        onFocus={event => {
          setFocus(true);
        }}
        onBlur={() => setFocus(false)}
      />
    </Box>
  );
}
export default TextEditor;