# app/controllers/game_controller.rb

class GameController < ApplicationController
  def index
    # Add any instructions or game description here
  end

  def play
    @result = roll_dice
    render json: { result: @result }
  end

  private

  def roll_dice
    # Add your dice rolling logic here
    # For example:
    dice_faces = [1, 2, 3, 4, 5, 6]
    dice_faces.sample
  end
end
