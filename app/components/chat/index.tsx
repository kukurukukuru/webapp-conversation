'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import Answer from './answer'
import Question from './question'
import type { FeedbackFunc } from './type'
import type { ChatItem } from '@/types/app'

export type IChatProps = {
  chatList: ChatItem[]
  /**
   * Whether to display the editing area and rating status
   */
  feedbackDisabled?: boolean
  onFeedback?: FeedbackFunc
  useCurrentUserAvatar?: boolean
  isResponding?: boolean
}

const Chat: FC<IChatProps> = ({
  chatList,
  feedbackDisabled = false,
  onFeedback,
  useCurrentUserAvatar,
  isResponding,
}) => {
  return (
    <div className={cn(!feedbackDisabled && 'px-3.5', 'h-full')}>
      {/* Chat List */}
      <div className="h-full space-y-[30px]">
        {chatList.map((item) => {
          if (item.isAnswer) {
            const isLast = item.id === chatList[chatList.length - 1].id
            return <Answer
              key={item.id}
              item={item}
              feedbackDisabled={feedbackDisabled}
              onFeedback={onFeedback}
              isResponding={isResponding && isLast}
            />
          }
          return (
            <Question
              key={item.id}
              id={item.id}
              content={item.content}
              useCurrentUserAvatar={useCurrentUserAvatar}
              imgSrcs={(item.message_files && item.message_files?.length > 0) ? item.message_files.map(item => item.url) : []}
            />
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(Chat)
