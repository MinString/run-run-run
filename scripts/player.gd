extends CharacterBody2D

@export var speed := 260.0
@export var jump_velocity := -520.0
var gravity := 1400.0
var animation_time := 0.0
var animation_frame := 0
@onready var visual: Sprite2D = $Visual

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y += gravity * delta

    var direction := Input.get_axis("move_left", "move_right")
    if direction != 0:
        velocity.x = direction * speed
        visual.flip_h = direction < 0
    else:
        velocity.x = move_toward(velocity.x, 0, speed * 8.0 * delta)

    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = jump_velocity

    move_and_slide()
    _update_hero_animation(delta, direction)

func _update_hero_animation(delta: float, direction: float) -> void:
    if direction == 0:
        animation_frame = 0
        animation_time = 0.0
        visual.frame = animation_frame
        return

    animation_time += delta
    if animation_time >= 0.10:
        animation_time = 0.0
        animation_frame = (animation_frame + 1) % 8
        visual.frame = animation_frame
