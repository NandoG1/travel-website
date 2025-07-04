"use client"

import React, { useState } from 'react'
import Review from './review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-hot-toast'
import { getReviewsByListing, postReview } from './service'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaPen } from 'react-icons/fa'
import Pagination from '@/components/pagination/pagination'

const Reviews = ({
    id
}:any) => {
    const [selectedStar, setSelectedStar] = useState(5)
    const [text, setText] = useState("")
    const [showReviewForm, setShowReviewForm] = useState(false)

    const queryClient = useQueryClient()

    const { data: reviews, isPending: isPendingQuery } = useQuery({
        queryFn: () => getReviewsByListing(id),
        queryKey: ["reviews"]
    })

    const { mutate, isPending } = useMutation({
        mutationFn: handleSubmit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] })
            queryClient.invalidateQueries({ queryKey: ["listings"] })
        }
    })

    const itemsPerPage = 4
    const [itemOffset, setItemOffset] = useState(0)
    const endOffset = itemOffset + itemsPerPage
    const currentReviews = reviews?.slice(itemOffset, endOffset)

    async function handleSubmit(e:any) {
        e.preventDefault()

        try {
            if (text === "") return toast.error("Review can't be empty")

            const body = {
                text,
                stars: selectedStar
            }

            await postReview(id, body)
            toast.success("Successfully posted a review")
            setText("")
            setShowReviewForm(false)
        } catch (error) {
            console.log(error)
        }
    }

    if (isPendingQuery) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <ClipLoader color={"#3B82F6"} size={30} />
                    <p className="mt-2 text-gray-600">Loading reviews...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Write Review Section */}
            <div className="border-b border-gray-200 pb-8">
                {!showReviewForm ? (
                    <button
                        onClick={() => setShowReviewForm(true)}
                        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                    >
                        <FaPen size={16} />
                        Write a Review
                    </button>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Share your experience</h3>
                            <button
                                onClick={() => setShowReviewForm(false)}
                                className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                        
                        {/* Star Rating */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Rating</label>
                            <div className="flex items-center gap-2">
                                {Array.from(Array(5).keys()).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => setSelectedStar(number + 1)}
                                        className={`transition-all duration-200 transform hover:scale-110 ${
                                            selectedStar >= number + 1 ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                    >
                                        <AiFillStar size={28} />
                                    </button>
                                ))}
                                <span className="ml-2 text-sm text-gray-600">
                                    {selectedStar} star{selectedStar !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>

                        {/* Review Text */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Your Review</label>
                            <textarea
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                rows={4}
                                placeholder="Share your thoughts about this place..."
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center gap-3">
                            <button
                                disabled={isPending || !text.trim()}
                                onClick={mutate}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <ClipLoader size={16} color="white" />
                                        Posting...
                                    </>
                                ) : (
                                    'Post Review'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {currentReviews && currentReviews.length > 0 ? (
                    <>
                        <div className="grid gap-6">
                            {currentReviews.map((review:any) => (
                                <Review
                                    key={review.id}
                                    review={review}
                                />
                            ))}
                        </div>
                        
                        {reviews && reviews.length > itemsPerPage && (
                            <div className="flex justify-center pt-8">
                                <Pagination
                                    setItemOffset={setItemOffset}
                                    itemsPerPage={itemsPerPage}
                                    reviews={reviews}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <div className="text-gray-400 mb-4">
                            <AiOutlineStar size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                        <p className="text-gray-600">Be the first to share your experience!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Reviews