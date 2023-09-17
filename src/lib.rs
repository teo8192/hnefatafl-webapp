extern crate wee_alloc;

mod utils;

use wasm_bindgen::prelude::*;

use hnefatafl_core::{Board, Piece, Turn};

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum CellType {
    Empty = 0,
    Attacker = 1,
    Defender = 2,
    King = 3,
}

#[wasm_bindgen]
pub struct Hnefatafl {
    board: Board,
    tiles: [CellType; 121],
}

#[wasm_bindgen]
impl Hnefatafl {
    pub fn new() -> Self {
        let mut game = Self {
            board: Board::new(),
            tiles: [CellType::Empty; 121],
        };
        game.copy_board_to_local();
        game
    }

    pub fn width(&self) -> usize {
        11
    }

    pub fn height(&self) -> usize {
        11
    }

    pub fn reset(&mut self) {
        self.board = Board::new();
    }

    pub fn is_black_to_play(&self) -> bool {
        self.board.get_turn() == Turn::Black
    }

    pub fn copy_board_to_local(&mut self) {
        (0..11)
            .flat_map(|x| (0..11).map(move |y| (x, y)))
            .for_each(|(x, y)| {
                let cell = self.board.get_piece_unchecked(x, y);
                self.tiles[(x + y * 11) as usize] = match cell {
                    None => CellType::Empty,
                    Some(Piece::Attacker) => CellType::Attacker,
                    Some(Piece::Defender) => CellType::Defender,
                    Some(Piece::King) => CellType::King,
                };
            });
    }

    pub fn tiles(&self) -> *const CellType {
        self.tiles.as_ptr()
    }

    pub fn get_board(&self) -> String {
        self.board.to_string()
    }

    pub fn render(&self) -> String {
        self.board.to_string()
    }

    pub fn move_piece(&mut self, from_x: i32, from_y: i32, to_x: i32, to_y: i32) -> String {
        self.board
            .move_piece(from_x, from_y, to_x, to_y)
            .map(|_| String::new())
            .map_err(|e| e.to_string())
            .unwrap_or_else(|e| e)
    }
}

impl Default for Hnefatafl {
    fn default() -> Self {
        Self::new()
    }
}
