import React, { useState, useEffect } from 'react'
import { Tooltip, Icon } from 'antd'
import Axios from 'axios'

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)

    let variable = {}
    
    if(props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }



    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {
                    // 얼마나 많은 좋아요를 받았는지
                    setLikes(response.data.likes.length)
                    // 내가 이미 그 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        if(like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })

        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if(response.data.success) {
                    // 얼마나 많은 싫어요를 받았는지
                    setDislikes(response.data.dislikes.length)
                    // 내가 이미 그 싫어요를 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId) {
                            setDisLikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get dislikes')
                }
            })

    }, [])

    const onLike = () => {

        if(LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if(DisLikeAction !== null) {
                            setDisLikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('Failed to increase the like')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('Failed to decrease the like')
                    }
                })
        }

    }

    const onDislike = () => {
        if (DisLikeAction !== null) {
            Axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDisLikeAction(null)
                    } else {
                        alert('Failed to decrease dislike')
                    }
                })

        } else {
            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(DisLikeAction + 1)
                        setDisLikeAction('disliked')
                        // 싫어요 버튼이 이미 눌러졌을 경우
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('Failed to increase dislike')
                    }
                })
        }
    }


    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked'? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DisLikeAction === 'disliked'? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </div>
    )
}

export default LikeDislikes
