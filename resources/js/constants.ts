export const STATUS_CLASS_MAP : Record<string, string>= {
    'pending' : 'bg-amber-600',
    'in_progress' : 'bg-blue-600',
    'completed' : 'bg-green-600'
}

export const STATUS_TEXT_MAP : Record<string , string>= {
    "pending" : "Pending",
    "in_progress" : "In Progress",
    "completed" : "Completed"
}

export const PRIORITY_CLASS_MAP : Record<string, string>= {
    'low' : 'bg-black',
    'medium' : 'bg-yellow-600',
    'high' : 'bg-amber-600'
}

export const PRIORITY_TEXT_MAP : Record<string , string>= {
    "low" : "Low",
    "medium" : "Medium",
    "high" : "High"
}