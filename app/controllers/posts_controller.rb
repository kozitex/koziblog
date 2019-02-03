class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @post = Post.new
    @posts = Post.page(params[:page]).per(5).order(created_at: :desc)
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.create(post_params)
    render json: @post
  end

  def show
  end

  def edit
  end

  def update
    @post.update(post_params)
    redirect_to action: :index
  end

  def destroy
    @post.destroy
  end

#-----------------------------------------
  private

  def post_params
    params.require(:post).permit(:content, :user_id)
  end

  def set_post
    @post = Post.find(params[:id])
  end

end
