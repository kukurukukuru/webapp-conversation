'use client'
import { FC, forwardRef, useImperativeHandle } from 'react'
import React, { useEffect, useRef } from 'react'
import Textarea from 'rc-textarea'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import Toast from '../../base/toast'
import { useImageFiles } from '../../base/image-uploader/hooks'
import s from '../style.module.css'
import ChatImageUploader from '../../base/image-uploader/chat-image-uploader'
import ImageList from '../../base/image-uploader/image-list'
import { TransferMethod, type VisionFile, type VisionSettings } from '@/types/app'
import Tooltip from '@/app/components/base/tooltip'

type IAnswerProps = {
  visionConfig?: VisionSettings
  isResponding?: boolean
  controlClearQuery?: number
  /**
   * Whether to display the editing area and rating status
   */
  feedbackDisabled?: boolean
  /**
   * Whether to display the input area
   */
  isHideSendInput?: boolean
  checkCanSend?: () => boolean
  onSend?: (message: string, files: VisionFile[]) => void
  setHeight: (height: number) => void
}

// The component needs to maintain its own state to control whether to display input component
const ChatTextarea = forwardRef<HTMLDivElement, IAnswerProps>(({
  visionConfig, isResponding, controlClearQuery, feedbackDisabled = false, isHideSendInput = false, checkCanSend, onSend = () => { }, setHeight
}, ref) => {
  const { t } = useTranslation()
  const { notify } = Toast
  const isUseInputMethod = useRef(false)
  const [query, setQuery] = React.useState('')
  const localRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (controlClearQuery)
      setQuery('')
  }, [controlClearQuery, setQuery])

  const logError = (message: string) => {
    notify({ type: 'error', message, duration: 3000 })
  }

  const valid = () => {
    if (!query || query.trim() === '') {
      logError('Message cannot be empty')
      return false
    }
    return true
  }

  const {
    files,
    onClear,
    onUpload,
    onRemove,
    onReUpload,
    onImageLinkLoadError,
    onImageLinkLoadSuccess,
  } = useImageFiles()

  const handleSend = () => {
    if (!valid() || (checkCanSend && !checkCanSend()))
      return
    onSend(query, files.filter(file => file.progress !== -1).map(fileItem => ({
      type: 'image',
      transfer_method: fileItem.type,
      url: fileItem.url,
      upload_file_id: fileItem.fileId,
    })))
    if (!files.find(item => item.type === TransferMethod.local_file && !item.fileId)) {
      if (files.length)
        onClear()
      if (!isResponding)
        setQuery('')
    }
  }

  const handleContentChange = (e: any) => {
    const value = e.target.value
    setQuery(value)
  }

  const handleKeyUp = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      // prevent send message when using input method enter
      if (!e.shiftKey && !isUseInputMethod.current)
        handleSend()
    }
  }

  const handleKeyDown = (e: any) => {
    isUseInputMethod.current = e.nativeEvent.isComposing
    if (e.code === 'Enter' && !e.shiftKey) {
      setQuery(query.replace(/\n$/, ''))
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (!localRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    observer.observe(localRef.current);

    return () => observer.disconnect();
  }, [setHeight]);

  if (isHideSendInput)
    return <></>

  return (
    <div ref={localRef} className={cn('absolute z-10 bottom-0 left-0 right-0 pb-4 px-4')} style={{ background: 'linear-gradient(0deg, rgb(249, 250, 251) 40%, rgba(255, 255, 255, 0) 100%)', }}>
      <div className='mx-auto  p-[5.5px] max-h-[150px] bg-white border-[1.5px] border-gray-200 rounded-xl overflow-y-auto max-w-[720px] relative'>
        {
          visionConfig?.enabled && (
            <>
              <div className='absolute bottom-6 left-2 flex items-center'>
                <ChatImageUploader
                  settings={visionConfig}
                  onUpload={onUpload}
                  disabled={files.length >= visionConfig.number_limits}
                />
                <div className='mx-1 w-[1px] h-4 bg-black/5' />
              </div>
              <div className='pl-[52px]'>
                <ImageList
                  list={files}
                  onRemove={onRemove}
                  onReUpload={onReUpload}
                  onImageLinkLoadSuccess={onImageLinkLoadSuccess}
                  onImageLinkLoadError={onImageLinkLoadError}
                />
              </div>
            </>
          )
        }
        <Textarea
          className={`
                  block w-full px-2 pr-[118px] py-[7px] leading-5 max-h-none text-sm text-gray-700 outline-none appearance-none resize-none
                  ${visionConfig?.enabled && 'pl-12'}
                `}
          value={query}
          onChange={handleContentChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          autoSize
          placeholder='Talk to Kontos Bot'
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 right-2 flex items-center h-8">
          <div className={`${s.count} mr-4 h-5 leading-5 text-sm bg-gray-50 text-gray-500`}>{query.trim().length}</div>
          {/* <Tooltip
            selector='send-tip'
            htmlContent={
              <div>
                <div>{t('common.operation.send')} Enter</div>
                <div>{t('common.operation.lineBreak')} Shift Enter</div>
              </div>
            }
          >
            <div className={`${s.sendBtn} w-8 h-8 cursor-pointer rounded-md`} onClick={handleSend}></div>
          </Tooltip> */}

          <div className={`${s.sendBtn} w-8 h-8 cursor-pointer rounded-md`} onClick={handleSend}></div>
        </div>
      </div>

    </div>
  )
})
ChatTextarea.displayName = 'ChatTextarea'
export default React.memo(ChatTextarea)
