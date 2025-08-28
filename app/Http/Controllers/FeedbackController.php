<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function index()
    {
        return response()->json(Feedback::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'comments' => 'required|string',
        ]);

        $feedback = Feedback::create($validated);

        return response()->json($feedback, 201);
    }
}
